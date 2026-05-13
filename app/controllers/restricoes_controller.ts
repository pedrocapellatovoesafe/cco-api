import Restricao from '#models/restricao'
import type { HttpContext } from '@adonisjs/core/http'
import { createRestricaoValidator, updateRestricaoValidator } from '#validators/restricao'
import RestricaoService from '#services/restricao_service'
import { inject } from '@adonisjs/core'

@inject()
export default class RestricoesController {
  constructor(protected restricaoService: RestricaoService) {}

  async index({ response }: HttpContext) {
    const restricoes = await Restricao.query()
      .preload('inva', (query) => query.preload('situacaoInva'))
      .preload('aeronave', (query) => query.preload('modeloAeronave'))
      .preload('modeloAeronave')
      .preload('aluno')
      .preload('missao', (query) => query.preload('curso'))
    return response.json(restricoes)
  }

  async show({ params, response }: HttpContext) {
    const restricao = await Restricao.query()
      .where('id', params.id)
      .preload('inva', (query) => query.preload('situacaoInva'))
      .preload('aeronave', (query) => query.preload('modeloAeronave'))
      .preload('modeloAeronave')
      .preload('aluno')
      .preload('missao', (query) => query.preload('curso'))
      .firstOrFail()
    return response.json(restricao)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createRestricaoValidator)
    const restricao = await Restricao.create(data)
    return response.json(restricao)
  }

  async update({ params, request, response }: HttpContext) {
    const restricao = await Restricao.findOrFail(params.id)
    const data = await request.validateUsing(updateRestricaoValidator)
    restricao.merge(data)
    await restricao.save()
    return response.json(restricao)
  }

  async destroy({ params, response }: HttpContext) {
    const restricao = await Restricao.findOrFail(params.id)
    await restricao.delete()
    return response.json({ message: 'Restricao deleted' })
  }

  async import({ request, response }: HttpContext) {
    const data = request.input('restricoes')

    if (!Array.isArray(data)) {
      return response.badRequest({
        message: 'O corpo da requisição deve conter um array de restrições no campo "restricoes"',
      })
    }

    const restricoes = await this.restricaoService.import(data)
    return response.json(restricoes)
  }
}