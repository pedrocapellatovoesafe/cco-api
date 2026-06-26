import vine from '@vinejs/vine'

export const createVooRealizadoValidator = vine.compile(
  vine.object({
    cavokId: vine.number(),
    tipoVooFinanceiro: vine.string().trim().nullable().optional(),
    missaoId: vine.number().nullable().optional(),
    invaId: vine.number().nullable().optional(),
    aeronaveId: vine.number().nullable().optional(),
    alunoId: vine.number().nullable().optional(),
    tempoTotalVoo: vine.number().nullable().optional(),
    abastecimento: vine.number().nullable().optional(),
    data: vine.string().trim().nullable().optional(),
  })
)

export const updateVooRealizadoValidator = vine.compile(
  vine.object({
    cavokId: vine.number().optional(),
    tipoVooFinanceiro: vine.string().trim().nullable().optional(),
    missaoId: vine.number().nullable().optional(),
    invaId: vine.number().nullable().optional(),
    aeronaveId: vine.number().nullable().optional(),
    alunoId: vine.number().nullable().optional(),
    tempoTotalVoo: vine.number().nullable().optional(),
    abastecimento: vine.number().nullable().optional(),
    data: vine.string().trim().nullable().optional(),
  })
)
