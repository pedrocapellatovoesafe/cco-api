import type { HttpContext } from '@adonisjs/core/http'
import EscalaTrabalho from '#models/escala_trabalho'

export default class EscalaTrabalhosController {
  async index({ request, response }: HttpContext) {
    const month = request.input('mes')

    const query = EscalaTrabalho.query()
      .preload('tipoDisponibilidade')
      .preload('inva')

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
    const data = request.only(['data', 'periodo', 'tipoDisponibilidadeId', 'invaId', 'motivo'])
    const escala = await EscalaTrabalho.create(data)
    return response.json(escala)
  }

  async update({ params, request, response }: HttpContext) {
    const escala = await EscalaTrabalho.findOrFail(params.id)
    const data = request.only(['data', 'periodo', 'tipoDisponibilidadeId', 'invaId', 'motivo'])
    escala.merge(data)
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
      return response.badRequest({ message: 'O corpo da requisição deve conter um array de escalas no campo "escalas"' })
    }

    const escalas = await EscalaTrabalho.createMany(data)
    return response.json(escalas)
  }
}
