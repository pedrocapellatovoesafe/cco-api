import vine from '@vinejs/vine'

export const createVooRealizadoValidator = vine.compile(
  vine.object({
    cavokId: vine.number(),
    tipoVooFinanceiro: vine.string().trim().nullable().optional(),
    missao: vine.string().trim().nullable().optional(),
    instrutor: vine.string().trim().nullable().optional(),
    aeronave: vine.string().trim().nullable().optional(),
    aluno: vine.string().trim().nullable().optional(),
    tempoTotalVoo: vine.number().nullable().optional(),
    abastecimento: vine.number().nullable().optional(),
    data: vine.string().trim().nullable().optional(),
  })
)

export const updateVooRealizadoValidator = vine.compile(
  vine.object({
    cavokId: vine.number().optional(),
    tipoVooFinanceiro: vine.string().trim().nullable().optional(),
    missao: vine.string().trim().nullable().optional(),
    instrutor: vine.string().trim().nullable().optional(),
    aeronave: vine.string().trim().nullable().optional(),
    aluno: vine.string().trim().nullable().optional(),
    tempoTotalVoo: vine.number().nullable().optional(),
    abastecimento: vine.number().nullable().optional(),
    data: vine.string().trim().nullable().optional(),
  })
)
