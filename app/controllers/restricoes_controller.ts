import Restricao from '#models/restricao'
import type { HttpContext } from '@adonisjs/core/http'

export default class RestricoesController {
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
    const data = request.only(['invaId', 'aeronaveId', 'modeloAeronaveId', 'alunoId', 'missaoId', 'observacao', 'isInva', 'isAluno', 'isAlunoInva', 'isModelo', 'isAeronave', 'isMissao'])
    const restricao = await Restricao.create(data)
    return response.json(restricao)
  }

  async update({ params, request, response }: HttpContext) {
    const restricao = await Restricao.findOrFail(params.id)
    const data = request.only(['invaId', 'aeronaveId', 'modeloAeronaveId', 'alunoId', 'missaoId', 'observacao', 'isInva', 'isAluno', 'isAlunoInva', 'isModelo', 'isAeronave', 'isMissao'])
    restricao.merge(data)
    await restricao.save()
    return response.json(restricao)
  }

  async destroy({ params, response }: HttpContext) {
    const restricao = await Restricao.findOrFail(params.id)
    await restricao.delete()
    return response.json({ message: 'Restricao deleted' })
  }
}