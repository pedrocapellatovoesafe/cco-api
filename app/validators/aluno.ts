import vine from '@vinejs/vine'

export const createAlunoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3).maxLength(255),
    cpf: vine.string().trim().regex(/^\d{11}$/).optional().nullable(),
    celular: vine.string().trim().minLength(10).maxLength(15).optional().nullable(),
  })
)

export const updateAlunoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3).maxLength(255).optional(),
    cpf: vine.string().trim().regex(/^\d{11}$/).optional().nullable(),
    celular: vine.string().trim().minLength(10).maxLength(15).optional().nullable(),
  })
)
