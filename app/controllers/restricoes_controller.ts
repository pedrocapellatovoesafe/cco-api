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
    const data = request.only(['invaId', 'nome', 'aeronaveId', 'modeloAeronaveId', 'alunoId', 'missaoId', 'observacao', 'isInva', 'isAluno', 'isAlunoInva', 'isModelo', 'isAeronave', 'isMissao'])
    const restricao = await Restricao.create(data)
    return response.json(restricao)
  }

  async update({ params, request, response }: HttpContext) {
    const restricao = await Restricao.findOrFail(params.id)
    const data = request.only(['invaId', 'nome', 'aeronaveId', 'modeloAeronaveId', 'alunoId', 'missaoId', 'observacao', 'isInva', 'isAluno', 'isAlunoInva', 'isModelo', 'isAeronave', 'isMissao'])
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

    const restricoesData = data.map((item: any) => {
      return {
        invaId: item.invaId,
        nome: item.nome,
        aeronaveId: item.aeronaveId,
        modeloAeronaveId: item.modeloAeronaveId,
        alunoId: item.alunoId,
        missaoId: item.missaoId,
        observacao: item.observacao,
        isInva: item.isInva,
        isAluno: item.isAluno,
        isAlunoInva: item.isAlunoInva,
        isModelo: item.isModelo,
        isAeronave: item.isAeronave,
        isMissao: item.isMissao,
      }
    })

    const restricoes = await Restricao.createMany(restricoesData)
    return response.json(restricoes)
  }
}