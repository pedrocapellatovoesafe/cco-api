import vine from '@vinejs/vine'

export const createInvaBarraValidator = vine.compile(
  vine.object({
    invaId: vine.number(),
    barraId: vine.number(),
  })
)

export const updateInvaBarraValidator = vine.compile(
  vine.object({
    invaId: vine.number().optional(),
    barraId: vine.number().optional(),
  })
)
