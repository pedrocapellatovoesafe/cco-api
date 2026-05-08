import ModeloAeronave from '#models/modelo_aeronave'
import type { HttpContext } from '@adonisjs/core/http'

export default class ModeloAeronavesController {
  async index({ response }: HttpContext) {
    const modelos = await ModeloAeronave.all()
    return response.json(modelos)
  }

  async show({ params, response }: HttpContext) {
    const modelo = await ModeloAeronave.findOrFail(params.id)
    return response.json(modelo)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome'])
    const modelo = await ModeloAeronave.create(data)
    return response.json(modelo)
  }

  async update({ params, request, response }: HttpContext) {
    const modelo = await ModeloAeronave.findOrFail(params.id)
    const data = request.only(['nome'])
    modelo.merge(data)
    await modelo.save()
    return response.json(modelo)
  }

  async destroy({ params, response }: HttpContext) {
    const modelo = await ModeloAeronave.findOrFail(params.id)
    await modelo.delete()
    return response.json({ message: 'Modelo Aeronave deleted' })
  }
}
