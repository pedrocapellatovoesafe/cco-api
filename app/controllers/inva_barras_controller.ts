import type { HttpContext } from '@adonisjs/core/http'
import InvaBarra from '#models/inva_barra'
import { createInvaBarraValidator, updateInvaBarraValidator } from '#validators/inva_barra'

export default class InvaBarrasController {
  async index({ request, response }: HttpContext) {
    const invaId = request.input('invaId')
    const barraId = request.input('barraId')

    const query = InvaBarra.query().preload('inva').preload('barra')

    if (invaId) {
      query.where('invaId', invaId)
    }

    if (barraId) {
      query.where('barraId', barraId)
    }

    const associations = await query
    return response.json(associations)
  }

  async show({ params, response }: HttpContext) {
    const association = await InvaBarra.query()
      .where('id', params.id)
      .preload('inva')
      .preload('barra')
      .firstOrFail()
    return response.json(association)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createInvaBarraValidator)
    
    // Check if the association already exists to avoid DB unique constraint exception
    const existing = await InvaBarra.query()
      .where('invaId', data.invaId)
      .where('barraId', data.barraId)
      .first()

    if (existing) {
      return response.conflict({
        message: 'Esta associação entre instrutor e barra já existe.',
      })
    }

    const association = await InvaBarra.create(data)
    await association.load('inva')
    await association.load('barra')
    return response.json(association)
  }

  async update({ params, request, response }: HttpContext) {
    const association = await InvaBarra.findOrFail(params.id)
    const data = await request.validateUsing(updateInvaBarraValidator)

    if (data.invaId !== undefined || data.barraId !== undefined) {
      const invaId = data.invaId ?? association.invaId
      const barraId = data.barraId ?? association.barraId

      const existing = await InvaBarra.query()
        .where('invaId', invaId)
        .where('barraId', barraId)
        .whereNot('id', params.id)
        .first()

      if (existing) {
        return response.conflict({
          message: 'Esta associação entre instrutor e barra já existe.',
        })
      }
    }

    association.merge(data)
    await association.save()
    await association.load('inva')
    await association.load('barra')
    return response.json(association)
  }

  async destroy({ params, response }: HttpContext) {
    const association = await InvaBarra.findOrFail(params.id)
    await association.delete()
    return response.json({ message: 'Associação excluída com sucesso' })
  }
}
