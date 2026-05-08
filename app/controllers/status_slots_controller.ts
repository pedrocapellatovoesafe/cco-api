import StatusSlot from '#models/status_slot'
import type { HttpContext } from '@adonisjs/core/http'

export default class StatusSlotsController {
  async index({ response }: HttpContext) {
    const status = await StatusSlot.all()
    return response.json(status)
  }

  async show({ params, response }: HttpContext) {
    const status = await StatusSlot.findOrFail(params.id)
    return response.json(status)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nome'])
    const status = await StatusSlot.create(data)
    return response.json(status)
  }

  async update({ params, request, response }: HttpContext) {
    const status = await StatusSlot.findOrFail(params.id)
    const data = request.only(['nome'])
    status.merge(data)
    await status.save()
    return response.json(status)
  }

  async destroy({ params, response }: HttpContext) {
    const status = await StatusSlot.findOrFail(params.id)
    await status.delete()
    return response.json({ message: 'Status Slot deleted' })
  }
}