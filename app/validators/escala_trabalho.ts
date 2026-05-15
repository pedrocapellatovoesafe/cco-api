import vine from '@vinejs/vine'

export const createEscalaTrabalhoValidator = vine.compile(
  vine.object({
    data: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    periodo: vine.string().trim(),
    tipoDisponibilidadeId: vine.number(),
    invaId: vine.number(),
    motivo: vine.string().trim().optional().nullable(),
  })
)

export const updateEscalaTrabalhoValidator = vine.compile(
  vine.object({
    data: vine
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    periodo: vine.string().trim().optional(),
    tipoDisponibilidadeId: vine.number().optional(),
    invaId: vine.number().optional(),
    motivo: vine.string().trim().optional().nullable(),
  })
)
