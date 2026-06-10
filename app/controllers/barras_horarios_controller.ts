import BarraHorario from '#models/barra_horario'
import type { HttpContext } from '@adonisjs/core/http'

export default class BarrasHorariosController {
  async index({ response }: HttpContext) {
    const horarios = await BarraHorario.query().preload('barra')
    return response.json(horarios)
  }

  async show({ params, response }: HttpContext) {
    const horario = await BarraHorario.query()
      .where('id', params.id)
      .preload('barra')
      .firstOrFail()
    return response.json(horario)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['hora', 'ativo', 'barraId'])
    const horario = await BarraHorario.create(data)
    return response.json(horario)
  }

  async update({ params, request, response }: HttpContext) {
    const horario = await BarraHorario.findOrFail(params.id)
    const data = request.only(['hora', 'ativo', 'barraId'])
    horario.merge(data)
    await horario.save()
    return response.json(horario)
  }

  async destroy({ params, response }: HttpContext) {
    const horario = await BarraHorario.findOrFail(params.id)
    await horario.delete()
    return response.json({ message: 'Horário deleted' })
  }
}
