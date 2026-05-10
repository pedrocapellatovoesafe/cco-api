import vine from '@vinejs/vine'

export const slotsFilterValidator = vine.compile(
  vine.object({
    startDate: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  })
)
