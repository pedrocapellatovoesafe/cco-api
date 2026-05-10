import type { HttpContext } from '@adonisjs/core/http'
import TipoDisponibilidade from '#models/tipo_disponibilidade'

export default class TipoDisponibilidadesController {
  async index({ response }: HttpContext) {
    const tipos = await TipoDisponibilidade.all()
    return response.json(tipos)
  }

  async show({ params, response }: HttpContext) {
    const tipo = await TipoDisponibilidade.findOrFail(params.id)
    return response.json(tipo)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome'])
    const tipo = await TipoDisponibilidade.create(data)
    return response.json(tipo)
  }

  async update({ params, request, response }: HttpContext) {
    const tipo = await TipoDisponibilidade.findOrFail(params.id)
    const data = request.only(['nome'])
    tipo.merge(data)
    await tipo.save()
    return response.json(tipo)
  }

  async destroy({ params, response }: HttpContext) {
    const tipo = await TipoDisponibilidade.findOrFail(params.id)
    await tipo.delete()
    return response.json({ message: 'Tipo de disponibilidade excluído com sucesso' })
  }
}
