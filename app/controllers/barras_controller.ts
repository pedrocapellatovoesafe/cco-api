import Barra from '#models/barra'
import type { HttpContext } from '@adonisjs/core/http'

export default class BarrasController {
  async index({ response }: HttpContext) {
    const barras = await Barra.query()
      .preload('modeloAeronave')
      .preload('base')
      .preload('horarios')
    return response.json(barras)
  }

  async show({ params, response }: HttpContext) {
    const barra = await Barra.query()
      .where('id', params.id)
      .preload('modeloAeronave')
      .preload('base')
      .preload('horarios')
      .firstOrFail()
    return response.json(barra)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome', 'modeloAeronaveId', 'baseId'])
    const barra = await Barra.create(data)
    await barra.load('modeloAeronave')
    await barra.load('base')
    await barra.load('horarios')
    return response.json(barra)
  }

  async update({ params, request, response }: HttpContext) {
    const barra = await Barra.findOrFail(params.id)
    const data = request.only(['nome', 'modeloAeronaveId', 'baseId'])
    barra.merge(data)
    await barra.save()
    await barra.load('modeloAeronave')
    await barra.load('base')
    await barra.load('horarios')
    return response.json(barra)
  }

  async destroy({ params, response }: HttpContext) {
    const barra = await Barra.findOrFail(params.id)
    await barra.delete()
    return response.json({ message: 'Barra deleted' })
  }
}
