import Curso from '#models/curso'
import type { HttpContext } from '@adonisjs/core/http'

export default class CursosController {
  async index({ response }: HttpContext) {
    const cursos = await Curso.query().preload('missoes')
    return response.json(cursos)
  }

  async show({ params, response }: HttpContext) {
    const curso = await Curso.query().where('id', params.id).preload('missoes').firstOrFail()
    return response.json(curso)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome'])
    const curso = await Curso.create(data)
    await curso.load('missoes')
    return response.json(curso)
  }

  async update({ params, request, response }: HttpContext) {
    const curso = await Curso.findOrFail(params.id)
    const data = request.only(['nome'])
    curso.merge(data)
    await curso.save()
    await curso.load('missoes')
    return response.json(curso)
  }

  async destroy({ params, response }: HttpContext) {
    const curso = await Curso.findOrFail(params.id)
    await curso.delete()
    return response.json({ message: 'Curso deleted' })
  }
}
