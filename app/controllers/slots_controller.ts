import Slot from '#models/slot'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { slotsFilterValidator, createSlotValidator, updateSlotValidator } from '#validators/slot'
import SlotService from '#services/slot_service'
import { inject } from '@adonisjs/core'

@inject()
export default class SlotsController {
  constructor(protected slotService: SlotService) {}

  async index({ request, response }: HttpContext) {
    const { startDate, endDate } = await request.validateUsing(slotsFilterValidator)

    const startLocal = DateTime.fromFormat(startDate, 'yyyy-MM-dd', {
      zone: 'America/Sao_Paulo',
    }).startOf('day')
    const start = startLocal.toUTC()

    const end = endDate
      ? DateTime.fromFormat(endDate, 'yyyy-MM-dd', { zone: 'America/Sao_Paulo' })
          .endOf('day')
          .toUTC()
      : startLocal.endOf('day').toUTC()

    const slots = await Slot.query()
      .whereBetween('dataHora', [start.toSQL()!, end.toSQL()!])
      .preload('statusSlot')
      .preload('aeronave', (query) =>
        query.preload('modeloAeronave').preload('restricoes', (query) => query.preload('inva'))
      )
      .preload('aluno', (query) => query.preload('restricoes', (query) => query.preload('inva')))
      .preload('inva', (query) =>
        query
          .preload('situacaoInva')
          .preload('restricoes', (query) => query.preload('missao').preload('aluno'))
      )
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
    const data = await request.validateUsing(createSlotValidator)
    try {
      const slot = await this.slotService.store(data)
      return response.json(slot)
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updateSlotValidator)
    try {
      const slot = await this.slotService.update(params.id, data)
      // Recarregar o slot para garantir que as relações estejam atualizadas
      const slotUpdated = await Slot.query()
        .where('id', slot.id)
        .preload('statusSlot')
        .preload('aeronave', (query) => query.preload('modeloAeronave'))
        .preload('aluno')
        .preload('missao', (query) => query.preload('curso'))
        .preload('barra', (query) => query.preload('modeloAeronave'))
        .firstOrFail()
      return response.json(slotUpdated)
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    const slot = await Slot.findOrFail(params.id)
    await slot.delete()
    return response.json({ message: 'Slot deleted' })
  }

  async import({ request, response }: HttpContext) {
    const body = request.body()
    if (!body.slots || !Array.isArray(body.slots)) {
      return response.status(400).json({
        error: 'Estrutura inválida. Esperado: { slots[] }',
      })
    }

    const { results, errors } = await this.slotService.import(body.slots)

    return response.json({
      success: errors.length === 0,
      results,
      errors: errors.length > 0 ? errors : undefined,
    })
  }
}
