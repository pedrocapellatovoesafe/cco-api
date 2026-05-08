import Missao from '#models/missao'
import type { HttpContext } from '@adonisjs/core/http'

export default class MissoesController {
  async index({ response }: HttpContext) {
    const missoes = await Missao.query().preload('curso')
    return response.json(missoes)
  }

  async show({ params, response }: HttpContext) {
    const missao = await Missao.query()
      .where('id', params.id)
      .preload('curso')
      .firstOrFail()
    return response.json(missao)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome', 'cursoId'])
    const missao = await Missao.create(data)
    return response.json(missao)
  }

  async update({ params, request, response }: HttpContext) {
    const missao = await Missao.findOrFail(params.id)
    const data = request.only(['nome', 'cursoId'])
    missao.merge(data)
    await missao.save()
    return response.json(missao)
  }

  async destroy({ params, response }: HttpContext) {
    const missao = await Missao.findOrFail(params.id)
    await missao.delete()
    return response.json({ message: 'Missao deleted' })
  }
}
