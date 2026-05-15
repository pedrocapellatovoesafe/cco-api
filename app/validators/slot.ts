import vine from '@vinejs/vine'

export const slotsFilterValidator = vine.compile(
  vine.object({
    startDate: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: vine
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
  })
)

export const createSlotValidator = vine.compile(
  vine.object({
    statusSlotId: vine.number(),
    aeronaveId: vine.number().optional().nullable(),
    invaId: vine.number().optional().nullable(),
    alunoId: vine.number().optional().nullable(),
    missaoId: vine.number().optional().nullable(),
    barraId: vine.number().optional().nullable(),
    dataHora: vine.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
    observacoes: vine.string().trim().optional().nullable(),
    isChecked: vine.boolean().optional(),
  })
)

export const updateSlotValidator = vine.compile(
  vine.object({
    statusSlotId: vine.number().optional(),
    aeronaveId: vine.number().optional().nullable(),
    invaId: vine.number().optional().nullable(),
    alunoId: vine.number().optional().nullable(),
    missaoId: vine.number().optional().nullable(),
    barraId: vine.number().optional().nullable(),
    dataHora: vine
      .string()
      .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
      .optional(),
    observacoes: vine.string().trim().optional().nullable(),
    isChecked: vine.boolean().optional(),
  })
)
