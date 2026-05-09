import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Inva from './inva.js'
import Aeronave from './aeronave.js'
import ModeloAeronave from './modelo_aeronave.js'
import Aluno from './aluno.js'
import Missao from './missao.js'

export default class Restricao extends BaseModel {
  public static table = 'restricoes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare invaId: number | null

  @column()
  declare aeronaveId: number | null

  @column()
  declare modeloAeronaveId: number | null

  @column()
  declare alunoId: number | null

  @column()
  declare missaoId: number | null

  @column()
  declare observacao: string | null

  @column()
  declare nome: string | null

  @column()
  declare isInva: boolean

  @column()
  declare isAluno: boolean

  @column()
  declare isAlunoInva: boolean

  @column()
  declare isModelo: boolean

  @column()
  declare isAeronave: boolean

  @column()
  declare isMissao: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Inva, {
    foreignKey: 'invaId',
  })
  declare inva: BelongsTo<typeof Inva> | null

  @belongsTo(() => Aeronave, {
    foreignKey: 'aeronaveId',
  })
  declare aeronave: BelongsTo<typeof Aeronave> | null

  @belongsTo(() => ModeloAeronave, {
    foreignKey: 'modeloAeronaveId',
  })
  declare modeloAeronave: BelongsTo<typeof ModeloAeronave> | null

  @belongsTo(() => Aluno, {
    foreignKey: 'alunoId',
  })
  declare aluno: BelongsTo<typeof Aluno> | null

  @belongsTo(() => Missao, {
    foreignKey: 'missaoId',
  })
  declare missao: BelongsTo<typeof Missao> | null
}
