import Inva from '#models/inva'
import type { HttpContext } from '@adonisjs/core/http'
import { createInvaValidator, updateInvaValidator } from '#validators/inva'

export default class InvasController {
  async index({ request, response }: HttpContext) {
    const month = request.input('mes')

    const query = Inva.query()
      .preload('situacaoInva')
      .preload('base')
      .preload('barras')
      .preload('escalas', (escalasQuery) => {
        escalasQuery.preload('tipoDisponibilidade')
        if (month) {
          escalasQuery.whereRaw("strftime('%Y-%m', data) = ?", [month])
        }
      })

    const invas = await query
    return response.json(invas)
  }

  async show({ params, response }: HttpContext) {
    const inva = await Inva.query()
      .where('id', params.id)
      .preload('situacaoInva')
      .preload('base')
      .preload('barras')
      .preload('escalas', (escalasQuery) => {
        escalasQuery.preload('tipoDisponibilidade')
      })
      .firstOrFail()
    return response.json(inva)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createInvaValidator)
    const inva = await Inva.create(data)
    await inva.load('situacaoInva')
    await inva.load('base')
    await inva.load('barras')
    return response.json(inva)
  }

  async update({ params, request, response }: HttpContext) {
    const inva = await Inva.findOrFail(params.id)
    const data = await request.validateUsing(updateInvaValidator)
    inva.merge(data)
    await inva.save()
    await inva.load('situacaoInva')
    await inva.load('base')
    await inva.load('barras')
    return response.json(inva)
  }

  async destroy({ params, response }: HttpContext) {
    const inva = await Inva.findOrFail(params.id)
    await inva.delete()
    return response.json({ message: 'Inva deleted' })
  }
}
