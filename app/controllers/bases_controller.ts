import Base from '#models/base'
import type { HttpContext } from '@adonisjs/core/http'

export default class BasesController {
  async index({ response }: HttpContext) {
    const bases = await Base.all()
    return response.json(bases)
  }

  async show({ params, response }: HttpContext) {
    const base = await Base.findOrFail(params.id)
    return response.json(base)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome'])
    const base = await Base.create(data)
    return response.json(base)
  }

  async update({ params, request, response }: HttpContext) {
    const base = await Base.findOrFail(params.id)
    const data = request.only(['nome'])
    base.merge(data)
    await base.save()
    return response.json(base)
  }

  async destroy({ params, response }: HttpContext) {
    const base = await Base.findOrFail(params.id)
    await base.delete()
    return response.json({ message: 'Base deleted' })
  }
}
