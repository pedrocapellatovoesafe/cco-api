import vine from '@vinejs/vine'

export const createInvaValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3).maxLength(255),
    celular: vine.string().trim().minLength(10).maxLength(15),
    situacaoInvaId: vine.number(),
    baseId: vine.number().optional().nullable(),
  })
)

export const updateInvaValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3).maxLength(255).optional(),
    celular: vine.string().trim().minLength(10).maxLength(15).optional(),
    situacaoInvaId: vine.number().optional(),
    baseId: vine.number().optional().nullable(),
  })
)
