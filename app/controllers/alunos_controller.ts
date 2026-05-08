import Aluno from '#models/aluno'
import type { HttpContext } from '@adonisjs/core/http'

export default class AlunosController {
  async index({ response }: HttpContext) {
    const alunos = await Aluno.all()
    return response.json(alunos)
  }

  async show({ params, response }: HttpContext) {
    const aluno = await Aluno.findOrFail(params.id)
    return response.json(aluno)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome', 'cpf', 'celular'])
    const aluno = await Aluno.create(data)
    return response.json(aluno)
  }

  async update({ params, request, response }: HttpContext) {
    const aluno = await Aluno.findOrFail(params.id)
    const data = request.only(['nome', 'cpf', 'celular'])
    aluno.merge(data)
    await aluno.save()
    return response.json(aluno)
  }

  async destroy({ params, response }: HttpContext) {
    const aluno = await Aluno.findOrFail(params.id)
    await aluno.delete()
    return response.json({ message: 'Aluno deleted' })
  }
}
