import SituacaoInva from '#models/situacao_inva'
import type { HttpContext } from '@adonisjs/core/http'

export default class SituacaoInvasController {
  async index({ response }: HttpContext) {
    const situacoes = await SituacaoInva.all()
    return response.json(situacoes)
  }

  async show({ params, response }: HttpContext) {
    const situacao = await SituacaoInva.findOrFail(params.id)
    return response.json(situacao)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome'])
    const situacao = await SituacaoInva.create(data)
    return response.json(situacao)
  }

  async update({ params, request, response }: HttpContext) {
    const situacao = await SituacaoInva.findOrFail(params.id)
    const data = request.only(['nome'])
    situacao.merge(data)
    await situacao.save()
    return response.json(situacao)
  }

  async destroy({ params, response }: HttpContext) {
    const situacao = await SituacaoInva.findOrFail(params.id)
    await situacao.delete()
    return response.json({ message: 'Situacao Inva deleted' })
  }
}
