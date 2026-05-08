import Curso from '#models/curso'
import type { HttpContext } from '@adonisjs/core/http'

export default class CursosController {
  async index({ response }: HttpContext) {
    const cursos = await Curso.all()
    return response.json(cursos)
  }

  async show({ params, response }: HttpContext) {
    const curso = await Curso.findOrFail(params.id)
    return response.json(curso)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome'])
    const curso = await Curso.create(data)
    return response.json(curso)
  }

  async update({ params, request, response }: HttpContext) {
    const curso = await Curso.findOrFail(params.id)
    const data = request.only(['nome'])
    curso.merge(data)
    await curso.save()
    return response.json(curso)
  }

  async destroy({ params, response }: HttpContext) {
    const curso = await Curso.findOrFail(params.id)
    await curso.delete()
    return response.json({ message: 'Curso deleted' })
  }
}
