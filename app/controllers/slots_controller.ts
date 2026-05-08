import Slot from '#models/slot'
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
      .preload('barra')
    return response.json(slots)
  }

  async show({ params, response }: HttpContext) {
    const slot = await Slot.query()
      .where('id', params.id)
      .preload('statusSlot')
      .preload('aeronave', (query) => query.preload('modeloAeronave'))
      .preload('aluno')
      .preload('missao', (query) => query.preload('curso'))
      .preload('barra')
      .firstOrFail()
    return response.json(slot)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['statusSlotId', 'aeronaveId', 'invaId', 'alunoId', 'missaoId', 'barraId', 'dataHora'])
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
    const data = request.only(['statusSlotId', 'aeronaveId', 'invaId', 'alunoId', 'missaoId', 'barraId', 'dataHora'])
    slot.merge(data)
    await slot.save()
    return response.json(slot)
  }

  async destroy({ params, response }: HttpContext) {
    const slot = await Slot.findOrFail(params.id)
    await slot.delete()
    return response.json({ message: 'Slot deleted' })
  }
}