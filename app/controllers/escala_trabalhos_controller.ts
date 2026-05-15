import type { HttpContext } from '@adonisjs/core/http'
import EscalaTrabalho from '#models/escala_trabalho'
import {
  createEscalaTrabalhoValidator,
  updateEscalaTrabalhoValidator,
} from '#validators/escala_trabalho'
import EscalaTrabalhoService from '#services/escala_trabalho_service'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'

@inject()
export default class EscalaTrabalhosController {
  constructor(protected escalaTrabalhoService: EscalaTrabalhoService) {}

  async index({ request, response }: HttpContext) {
    const month = request.input('mes')

    const query = EscalaTrabalho.query().preload('tipoDisponibilidade').preload('inva')

    if (month) {
      // Usando whereRaw para filtrar pelo ano e mês da data no formato YYYY-MM
      // O formato strftime('%Y-%m', data) no SQLite retorna '2026-05'
      query.whereRaw("strftime('%Y-%m', data) = ?", [month])
    }

    const escalas = await query
    return response.json(escalas)
  }

  async show({ params, response }: HttpContext) {
    const escala = await EscalaTrabalho.query()
      .where('id', params.id)
      .preload('tipoDisponibilidade')
      .preload('inva')
      .firstOrFail()
    return response.json(escala)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createEscalaTrabalhoValidator)
    const payload = {
      ...data,
      data: DateTime.fromFormat(data.data, 'yyyy-MM-dd'),
    }
    const escala = await EscalaTrabalho.create(payload as any)
    return response.json(escala)
  }

  async update({ params, request, response }: HttpContext) {
    const escala = await EscalaTrabalho.findOrFail(params.id)
    const data = await request.validateUsing(updateEscalaTrabalhoValidator)
    const payload = {
      ...data,
      data: data.data ? DateTime.fromFormat(data.data, 'yyyy-MM-dd') : undefined,
    }
    escala.merge(payload as any)
    await escala.save()
    return response.json(escala)
  }

  async destroy({ params, response }: HttpContext) {
    const escala = await EscalaTrabalho.findOrFail(params.id)
    await escala.delete()
    return response.json({ message: 'Escala de trabalho excluída com sucesso' })
  }

  async import({ request, response }: HttpContext) {
    const data = request.input('escalas')

    if (!Array.isArray(data)) {
      return response.badRequest({
        message: 'O corpo da requisição deve conter um array de escalas no campo "escalas"',
      })
    }

    const results = await this.escalaTrabalhoService.import(data)
    return response.json(results)
  }
}
