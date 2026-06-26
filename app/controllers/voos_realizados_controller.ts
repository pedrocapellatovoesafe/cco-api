import type { HttpContext } from '@adonisjs/core/http'
import VooRealizado from '#models/voo_realizado'
import { createVooRealizadoValidator, updateVooRealizadoValidator } from '#validators/voo_realizado'
import env from '#start/env'
import { DateTime } from 'luxon'

export default class VoosRealizadosController {
  /**
   * Sync flights from Cavok API for a given date
   */
  async sync({ request, response }: HttpContext) {
    // Get date from query string, default to current date in Sao Paulo timezone (YYYY-MM-DD)
    const dateParam = request.input('data')
    const targetDate = dateParam || DateTime.now().setZone('America/Sao_Paulo').toFormat('yyyy-MM-dd')

    const email = env.get('CAVOK_EMAIL')
    const password = env.get('CAVOK_PASSWORD')
    const basicAuth = 'Basic ' + Buffer.from(`${email}:${password}`).toString('base64')

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
        return response.badRequest({
          message: `Erro ao consultar a API do Cavok. Status: ${cavokResponse.status}`,
        })
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
        return response.badRequest({
          message: `Erro retornado pela API do Cavok: ${body.error}`,
        })
      }

      const flights = body.response || []
      const syncedFlights: VooRealizado[] = []

      for (const flight of flights) {
        const record = await VooRealizado.updateOrCreate(
          { cavokId: flight.Id },
          {
            tipoVooFinanceiro: flight['Tipo de voo financeiro'],
            missao: flight.Missao,
            instrutor: flight.Instrutor,
            aeronave: flight.Aeronave,
            aluno: flight.Aluno,
            tempoTotalVoo: flight['Tempo total de voo'],
            abastecimento: flight.Abastecimento,
            data: flight.Data,
          }
        )
        syncedFlights.push(record)
      }

      return response.json({
        message: `Sincronização concluída com sucesso para a data ${targetDate}.`,
        syncedCount: syncedFlights.length,
        flights: syncedFlights,
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
    const query = VooRealizado.query().orderBy('cavokId', 'desc')

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
    const flight = await VooRealizado.findOrFail(params.id)
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
