import Inva from '#models/inva'
import type { HttpContext } from '@adonisjs/core/http'

export default class InvasController {
  async index({ response }: HttpContext) {
    const invas = await Inva.query().preload('situacaoInva').preload('base')
    return response.json(invas)
  }

  async show({ params, response }: HttpContext) {
    const inva = await Inva.query()
      .where('id', params.id)
      .preload('situacaoInva')
      .preload('base')
      .firstOrFail()
    return response.json(inva)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome', 'celular', 'situacaoInvaId', 'baseId'])
    const inva = await Inva.create(data)
    return response.json(inva)
  }

  async update({ params, request, response }: HttpContext) {
    const inva = await Inva.findOrFail(params.id)
    const data = request.only(['nome', 'celular', 'situacaoInvaId', 'baseId'])
    inva.merge(data)
    await inva.save()
    return response.json(inva)
  }

  async destroy({ params, response }: HttpContext) {
    const inva = await Inva.findOrFail(params.id)
    await inva.delete()
    return response.json({ message: 'Inva deleted' })
  }
}
