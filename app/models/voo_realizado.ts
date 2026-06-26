import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class VooRealizado extends BaseModel {
  public static table = 'voos_realizados'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cavokId: number

  @column()
  declare tipoVooFinanceiro: string | null

  @column()
  declare missao: string | null

  @column()
  declare instrutor: string | null

  @column()
  declare aeronave: string | null

  @column()
  declare aluno: string | null

  @column()
  declare tempoTotalVoo: number | null

  @column()
  declare abastecimento: number | null

  @column()
  declare data: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
