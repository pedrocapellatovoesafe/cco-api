import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Missao from './missao.js'
import Inva from './inva.js'
import Aeronave from './aeronave.js'
import Aluno from './aluno.js'

export default class VooRealizado extends BaseModel {
  public static table = 'voos_realizados'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cavokId: number

  @column()
  declare tipoVooFinanceiro: string | null

  @column()
  declare missaoId: number | null

  @column()
  declare invaId: number | null

  @column()
  declare aeronaveId: number | null

  @column()
  declare alunoId: number | null

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

  @belongsTo(() => Missao, {
    foreignKey: 'missaoId',
  })
  declare missaoRelation: BelongsTo<typeof Missao>

  @belongsTo(() => Inva, {
    foreignKey: 'invaId',
  })
  declare invaRelation: BelongsTo<typeof Inva>

  @belongsTo(() => Aeronave, {
    foreignKey: 'aeronaveId',
  })
  declare aeronaveRelation: BelongsTo<typeof Aeronave>

  @belongsTo(() => Aluno, {
    foreignKey: 'alunoId',
  })
  declare alunoRelation: BelongsTo<typeof Aluno>
}
