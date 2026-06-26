import Aeronave from '#models/aeronave'
import type { HttpContext } from '@adonisjs/core/http'

export default class AeronavesController {
  async index({ response }: HttpContext) {
    const aeronaves = await Aeronave.query().preload('modeloAeronave')
    return response.json(aeronaves)
  }

  async show({ params, response }: HttpContext) {
    const aeronave = await Aeronave.query()
      .where('id', params.id)
      .preload('modeloAeronave')
      .firstOrFail()
    return response.json(aeronave)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome', 'modeloAeronaveId', 'horasDisponiveis', 'tipoAeronave', 'tipoSimulador'])
    const aeronave = await Aeronave.create(data)
    return response.json(aeronave)
  }

  async update({ params, request, response }: HttpContext) {
    const aeronave = await Aeronave.findOrFail(params.id)
    const data = request.only(['nome', 'modeloAeronaveId', 'horasDisponiveis', 'tipoAeronave', 'tipoSimulador'])
    aeronave.merge(data)
    await aeronave.save()
    return response.json(aeronave)
  }

  async destroy({ params, response }: HttpContext) {
    const aeronave = await Aeronave.findOrFail(params.id)
    await aeronave.delete()
    return response.json({ message: 'Aeronave deleted' })
  }
}
