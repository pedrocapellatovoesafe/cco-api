import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.json(users)
  }

  async show({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return response.json(user)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    data.password = await hash.make(data.password)
    const user = await User.create(data)
    return response.json(user)
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['fullName', 'email', 'password'])
    if (data.password) {
      data.password = await hash.make(data.password)
    }
    user.merge(data)
    await user.save()
    return response.json(user)
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.json({ message: 'User deleted' })
  }
}