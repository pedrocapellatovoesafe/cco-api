import Slot from '#models/slot'
import Aluno from '#models/aluno'
import Inva from '#models/inva'
import Aeronave from '#models/aeronave'
import Missao from '#models/missao'
import Barra from '#models/barra'
import StatusSlot from '#models/status_slot'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class SlotsController {
  async index({ response }: HttpContext) {
    const slots = await Slot.query()
      .preload('statusSlot')
      .preload('aeronave', (query) => query.preload('modeloAeronave'))
      .preload('aluno')
      .preload('inva', (query) => query.preload('situacaoInva'))
      .preload('missao', (query) => query.preload('curso'))
      .preload('barra', (query) => query.preload('modeloAeronave'))
    return response.json(slots)
  }

  async show({ params, response }: HttpContext) {
    const slot = await Slot.query()
      .where('id', params.id)
      .preload('statusSlot')
      .preload('aeronave', (query) => query.preload('modeloAeronave'))
      .preload('aluno')
      .preload('missao', (query) => query.preload('curso'))
      .preload('barra', (query) => query.preload('modeloAeronave'))
      .firstOrFail()
    return response.json(slot)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['statusSlotId', 'aeronaveId', 'invaId', 'alunoId', 'missaoId', 'barraId', 'dataHora', 'observacoes'])
    if (data.dataHora) {
    // 1. Recebe a string e avisa que ela está no fuso de SP/Brasília
    // 2. Converte para UTC antes de salvar no banco
    data.dataHora = DateTime.fromFormat(data.dataHora, 'yyyy-MM-dd HH:mm', { zone: 'America/Sao_Paulo' }).toUTC()
    }
    const slot = await Slot.create(data)
    return response.json(slot)
  }

  async update({ params, request, response }: HttpContext) {
    const slot = await Slot.findOrFail(params.id)
    const data = request.only(['statusSlotId', 'aeronaveId', 'invaId', 'alunoId', 'missaoId', 'barraId', 'dataHora', 'observacoes'])
    slot.merge(data)
    await slot.save()
    return response.json(slot)
  }

  async destroy({ params, response }: HttpContext) {
    const slot = await Slot.findOrFail(params.id)
    await slot.delete()
    return response.json({ message: 'Slot deleted' })
  }

  async import({ request, response }: HttpContext) {
    const body = request.body()
    // Validar estrutura básica
    if (!body.slots || !Array.isArray(body.slots)) {
      return response.status(400).json({
        error: 'Estrutura inválida. Esperado: { slots[] }'
      })
    }

    const results = []
    const errors = []

    for (const slotData of body.slots) {
      try {
        // Validar campos obrigatórios mínimos
        const requiredFields = ['hora', 'st', 'barra', 'data']
        const missingFields = requiredFields.filter(field => !slotData[field])

        if (missingFields.length > 0) {
          errors.push({
            slotId: slotData.id,
            error: `Campos obrigatórios faltando: ${missingFields.join(', ')}`
          })
          continue
        }

        // Combinar data e hora
        const dateStr = slotData.data
        const timeStr = slotData.hora
        const dataHoraStr = `${dateStr} ${timeStr}`

        const dataHora = DateTime.fromFormat(dataHoraStr, 'dd/MM/yyyy HH:mm', {
          zone: 'America/Sao_Paulo'
        })

        if (!dataHora.isValid) {
          errors.push({
            slotId: slotData.id,
            error: `Data/hora inválida: ${dataHoraStr}`
          })
          continue
        }

        const dataHoraUtc = dataHora.toUTC()

        const normalize = (value: unknown) => {
          if (value === undefined || value === null) {
            return null
          }

          const normalized = String(value).trim()
          return normalized === '' ? null : normalized
        }

        const alunoName = normalize(slotData.aluno)
        const invaName = normalize(slotData.inva)
        const aeronaveName = normalize(slotData.ae)
        const missaoName = normalize(slotData.missao)
        const barraName = normalize(slotData.barra)
        const statusName = normalize(slotData.st)

        let aluno = alunoName ? await Aluno.query().where('nome', alunoName).first() : null
        if (alunoName && !aluno) {
          aluno = await Aluno.create({
            nome: alunoName,
            cpf: null,
            celular: null
          })
        }

        const inva = invaName ? await Inva.query().where('nome', invaName).first() : null
        if (invaName && !inva) {
          errors.push({
            slotId: slotData.id,
            error: `Instrutor (inva) não encontrado: ${invaName}`
          })
          continue
        }

        const aeronave = aeronaveName ? await Aeronave.query().where('nome', aeronaveName).first() : null
        if (aeronaveName && !aeronave) {
          errors.push({
            slotId: slotData.id,
            error: `Aeronave não encontrada: ${aeronaveName}`
          })
          continue
        }

        const missao = missaoName ? await Missao.query().where('nome', missaoName).first() : null
        if (missaoName && !missao) {
          errors.push({
            slotId: slotData.id,
            error: `Missão não encontrada: ${missaoName}`
          })
          continue
        }

        const barra = await Barra.query().where('nome', barraName).first()
        if (!barra) {
          errors.push({
            slotId: slotData.id,
            error: `Barra não encontrada: ${barraName}`
          })
          continue
        }

        const statusSlot = await StatusSlot.query().where('nome', statusName).first()
        if (!statusSlot) {
          errors.push({
            slotId: slotData.id,
            error: `Status não encontrado: ${statusName}`
          })
          continue
        }

        // Procurar por slot existente com a mesma dataHora
        let slot = await Slot.query().where('dataHora', dataHoraUtc.toSQL()).first()

        const slotPayload = {
          dataHora: dataHoraUtc,
          alunoId: aluno ? aluno.id : null,
          invaId: inva ? inva.id : null,
          aeronaveId: aeronave ? aeronave.id : null,
          missaoId: missao ? missao.id : null,
          statusSlotId: statusSlot.id,
          barraId: barra.id,
          observacoes: slotData.observacoes || null
        }
        console.log(slotPayload)

        if (slot) {
          // Atualizar slot existente
          slot.merge(slotPayload)
          await slot.save()
          results.push({
            slotId: slotData.id,
            action: 'updated',
            slot: slot.serialize()
          })
          console.log(`Slot atualizado: ${slot.id} para dataHora ${dataHoraUtc.toSQL()}`)
        } else {
          // Criar novo slot
          slot = await Slot.create(slotPayload)
          results.push({
            slotId: slotData.id,
            action: 'created',
            slot: slot.serialize()
          })
          console.log(`Slot criado: ${slot.id} para dataHora ${dataHoraUtc.toSQL()}`)
        }
      } catch (e) {
        errors.push({
          slotId: slotData.id,
          error: (e as Error).message
        })
        console.error(`Erro ao processar slotId ${slotData.id}:`, e)
      }
    }

    return response.json({
      success: errors.length === 0,
      results,
      errors: errors.length > 0 ? errors : undefined
    })
  }
}