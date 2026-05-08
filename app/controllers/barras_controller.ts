import Barra from '#models/barra'
import type { HttpContext } from '@adonisjs/core/http'

export default class BarrasController {
  async index({ response }: HttpContext) {
    const barras = await Barra.query().preload('modeloAeronave')
    return response.json(barras)
  }

  async show({ params, response }: HttpContext) {
    const barra = await Barra.query()
      .where('id', params.id)
      .preload('modeloAeronave')
      .firstOrFail()
    return response.json(barra)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome', 'modeloAeronaveId'])
    const barra = await Barra.create(data)
    return response.json(barra)
  }

  async update({ params, request, response }: HttpContext) {
    const barra = await Barra.findOrFail(params.id)
    const data = request.only(['nome', 'modeloAeronaveId'])
    barra.merge(data)
    await barra.save()
    return response.json(barra)
  }

  async destroy({ params, response }: HttpContext) {
    const barra = await Barra.findOrFail(params.id)
    await barra.delete()
    return response.json({ message: 'Barra deleted' })
  }
}
