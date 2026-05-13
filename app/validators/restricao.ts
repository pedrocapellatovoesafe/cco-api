import vine from '@vinejs/vine'

export const createRestricaoValidator = vine.compile(
  vine.object({
    invaId: vine.number().optional().nullable(),
    nome: vine.string().trim().minLength(1).maxLength(255).optional().nullable(),
    aeronaveId: vine.number().optional().nullable(),
    modeloAeronaveId: vine.number().optional().nullable(),
    alunoId: vine.number().optional().nullable(),
    missaoId: vine.number().optional().nullable(),
    observacao: vine.string().trim().optional().nullable(),
    isInva: vine.boolean().optional(),
    isAluno: vine.boolean().optional(),
    isAlunoInva: vine.boolean().optional(),
    isModelo: vine.boolean().optional(),
    isAeronave: vine.boolean().optional(),
    isMissao: vine.boolean().optional(),
  })
)

export const updateRestricaoValidator = vine.compile(
  vine.object({
    invaId: vine.number().optional().nullable(),
    nome: vine.string().trim().minLength(1).maxLength(255).optional().nullable(),
    aeronaveId: vine.number().optional().nullable(),
    modeloAeronaveId: vine.number().optional().nullable(),
    alunoId: vine.number().optional().nullable(),
    missaoId: vine.number().optional().nullable(),
    observacao: vine.string().trim().optional().nullable(),
    isInva: vine.boolean().optional(),
    isAluno: vine.boolean().optional(),
    isAlunoInva: vine.boolean().optional(),
    isModelo: vine.boolean().optional(),
    isAeronave: vine.boolean().optional(),
    isMissao: vine.boolean().optional(),
  })
)
