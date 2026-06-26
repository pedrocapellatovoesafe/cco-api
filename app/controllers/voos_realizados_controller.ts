import type { HttpContext } from '@adonisjs/core/http'
import VooRealizado from '#models/voo_realizado'
import Missao from '#models/missao'
import Inva from '#models/inva'
import Aeronave from '#models/aeronave'
import Aluno from '#models/aluno'
import Curso from '#models/curso'
import SituacaoInva from '#models/situacao_inva'
import ModeloAeronave from '#models/modelo_aeronave'
import { createVooRealizadoValidator, updateVooRealizadoValidator } from '#validators/voo_realizado'
import env from '#start/env'
import { DateTime } from 'luxon'

export default class VoosRealizadosController {
  /**
   * Sync flights from Cavok API for a given date
   */
  async sync({ request, response }: HttpContext) {
    let startDateStr = request.input('data_inicial')
    let endDateStr = request.input('data_final')
    const singleDate = request.input('data')

    // Standardize input dates
    if (!startDateStr && !endDateStr) {
      startDateStr = singleDate || DateTime.now().setZone('America/Sao_Paulo').toFormat('yyyy-MM-dd')
      endDateStr = startDateStr
    } else {
      startDateStr = startDateStr || endDateStr
      endDateStr = endDateStr || startDateStr
    }

    const start = DateTime.fromISO(startDateStr!)
    const end = DateTime.fromISO(endDateStr!)

    if (!start.isValid || !end.isValid) {
      return response.badRequest({
        message: 'Formato de data inválido. Use o formato YYYY-MM-DD.',
      })
    }

    if (start > end) {
      return response.badRequest({
        message: 'A data inicial não pode ser posterior à data final.',
      })
    }

    // Limit synchronization window to 31 days to optimize and avoid overloading
    const diffDays = end.diff(start, 'days').days
    if (diffDays > 31) {
      return response.badRequest({
        message: 'O intervalo de sincronização não pode ser maior que 31 dias.',
      })
    }

    // Generate list of dates to sync
    const datesToSync: string[] = []
    let current = start
    while (current <= end) {
      datesToSync.push(current.toFormat('yyyy-MM-dd'))
      current = current.plus({ days: 1 })
    }

    const email = env.get('CAVOK_EMAIL')
    const password = env.get('CAVOK_PASSWORD')
    const basicAuth = 'Basic ' + Buffer.from(`${email}:${password}`).toString('base64')

    const summary: Array<{ date: string; count: number; status: string; error?: string }> = []
    let totalSyncedCount = 0

    try {
      for (const targetDate of datesToSync) {
        try {
          const url = `https://voesafe.cavok.in/api/voos/?data=${targetDate}`
          const cavokResponse = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': basicAuth,
              'Accept': 'application/json',
            },
          })

          if (!cavokResponse.ok) {
            summary.push({
              date: targetDate,
              count: 0,
              status: 'failed',
              error: `API do Cavok retornou status ${cavokResponse.status}`,
            })
            continue
          }

          const body = await cavokResponse.json() as {
            status: number
            response: Array<{
              'Tipo de voo financeiro': string
              'Missao': string
              'Instrutor': string
              'Aeronave': string
              'Aluno': string
              'Tempo total de voo': number
              'Abastecimento': number
              'Data': string
              'Id': number
            }>
            error: string | null
          }

          if (body.error) {
            summary.push({
              date: targetDate,
              count: 0,
              status: 'failed',
              error: body.error,
            })
            continue
          }

          const flights = body.response || []
          let daySyncedCount = 0

          for (const flight of flights) {
            try {
              // 1. Resolve Missao
              let missaoId: number | null = null
              if (flight.Missao) {
                const parts = flight.Missao.split('>').map((p) => p.trim())
                const courseName = parts[0] || 'Geral'
                const missionName = parts[parts.length - 1] || flight.Missao.trim()

                if (missionName) {
                  const curso = await Curso.firstOrCreate({ nome: courseName }, { nome: courseName })
                  const missaoRecord = await Missao.firstOrCreate(
                    { nome: missionName, cursoId: curso.id },
                    { nome: missionName, cursoId: curso.id }
                  )
                  missaoId = missaoRecord.id
                }
              }

              // 2. Resolve Inva (Instructor)
              let invaId: number | null = null
              if (flight.Instrutor) {
                const name = flight.Instrutor.trim()
                if (name) {
                  let invaRecord = await Inva.findBy('nome', name)
                  if (!invaRecord) {
                    const defaultSituacao = await SituacaoInva.query().first()
                    const situacaoInvaId = defaultSituacao ? defaultSituacao.id : 1
                    invaRecord = await Inva.create({
                      nome: name,
                      celular: '',
                      situacaoInvaId,
                      baseId: null,
                    })
                  }
                  invaId = invaRecord.id
                }
              }

              // 3. Resolve Aeronave
              let aeronaveId: number | null = null
              if (flight.Aeronave) {
                const name = flight.Aeronave.trim()
                if (name) {
                  let aeronaveRecord = await Aeronave.findBy('nome', name)
                  if (!aeronaveRecord) {
                    const defaultModelo = await ModeloAeronave.query().first()
                    const modeloAeronaveId = defaultModelo ? defaultModelo.id : 1
                    const isSim = name.startsWith('PC-') || name.startsWith('SM-')
                    aeronaveRecord = await Aeronave.create({
                      nome: name,
                      modeloAeronaveId,
                      horasDisponiveis: 0,
                      tipoAeronave: !isSim,
                      tipoSimulador: isSim,
                    })
                  }
                  aeronaveId = aeronaveRecord.id
                }
              }

              // 4. Resolve Aluno
              let alunoId: number | null = null
              if (flight.Aluno) {
                const name = flight.Aluno.trim()
                if (name) {
                  let alunoRecord = await Aluno.findBy('nome', name)
                  if (!alunoRecord) {
                    alunoRecord = await Aluno.create({
                      nome: name,
                      cpf: null,
                      celular: null,
                    })
                  }
                  alunoId = alunoRecord.id
                }
              }

              // 5. Update or Create VooRealizado
              await VooRealizado.updateOrCreate(
                { cavokId: flight.Id },
                {
                  tipoVooFinanceiro: flight['Tipo de voo financeiro'],
                  missaoId,
                  invaId,
                  aeronaveId,
                  alunoId,
                  tempoTotalVoo: flight['Tempo total de voo'],
                  abastecimento: flight.Abastecimento,
                  data: flight.Data,
                }
              )
              daySyncedCount++
              totalSyncedCount++
            } catch (flightErr) {
              // Log the error for this specific flight and continue with the rest of the flights
              console.error(`Erro ao sincronizar voo ID ${flight.Id}:`, flightErr)
            }
          }

          summary.push({
            date: targetDate,
            count: daySyncedCount,
            status: 'success',
          })

          // Polite delay (50ms) to avoid overwhelming external API when syncing multiple days
          if (datesToSync.length > 1) {
            await new Promise((resolve) => setTimeout(resolve, 50))
          }
        } catch (dayErr) {
          summary.push({
            date: targetDate,
            count: 0,
            status: 'failed',
            error: dayErr instanceof Error ? dayErr.message : String(dayErr),
          })
        }
      }

      return response.json({
        message: 'Processo de sincronização concluído.',
        totalDays: datesToSync.length,
        totalSyncedCount,
        summary,
      })
    } catch (err) {
      return response.internalServerError({
        message: 'Erro interno ao processar a sincronização dos voos.',
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }

  /**
   * List all realized flights in database
   */
  async index({ request, response }: HttpContext) {
    const date = request.input('data')
    const query = VooRealizado.query()
      .preload('missaoRelation')
      .preload('invaRelation')
      .preload('aeronaveRelation')
      .preload('alunoRelation')
      .orderBy('cavokId', 'desc')

    if (date) {
      query.where('data', 'like', `%${date}%`)
    }

    const flights = await query
    return response.json(flights)
  }

  /**
   * Get details of a single flight
   */
  async show({ params, response }: HttpContext) {
    const flight = await VooRealizado.query()
      .where('id', params.id)
      .preload('missaoRelation')
      .preload('invaRelation')
      .preload('aeronaveRelation')
      .preload('alunoRelation')
      .firstOrFail()
    return response.json(flight)
  }

  /**
   * Create flight manually (CRUD)
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createVooRealizadoValidator)
    
    // Check unique cavokId
    const existing = await VooRealizado.findBy('cavokId', data.cavokId)
    if (existing) {
      return response.conflict({
        message: `Um voo com o ID do Cavok ${data.cavokId} já está cadastrado.`,
      })
    }

    const flight = await VooRealizado.create(data)
    await flight.load('missaoRelation')
    await flight.load('invaRelation')
    await flight.load('aeronaveRelation')
    await flight.load('alunoRelation')
    return response.json(flight)
  }

  /**
   * Update flight manually (CRUD)
   */
  async update({ params, request, response }: HttpContext) {
    const flight = await VooRealizado.findOrFail(params.id)
    const data = await request.validateUsing(updateVooRealizadoValidator)

    if (data.cavokId !== undefined && data.cavokId !== flight.cavokId) {
      const existing = await VooRealizado.query()
        .where('cavokId', data.cavokId)
        .whereNot('id', params.id)
        .first()

      if (existing) {
        return response.conflict({
          message: `Um voo com o ID do Cavok ${data.cavokId} já está cadastrado.`,
        })
      }
    }

    flight.merge(data)
    await flight.save()
    await flight.load('missaoRelation')
    await flight.load('invaRelation')
    await flight.load('aeronaveRelation')
    await flight.load('alunoRelation')
    return response.json(flight)
  }

  /**
   * Delete flight manually (CRUD)
   */
  async destroy({ params, response }: HttpContext) {
    const flight = await VooRealizado.findOrFail(params.id)
    await flight.delete()
    return response.json({ message: 'Voo realizado excluído com sucesso.' })
  }
}
