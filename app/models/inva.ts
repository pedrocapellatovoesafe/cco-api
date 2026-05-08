import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import SituacaoInva from './situacao_inva.js'
import Restricao from './restricao.js'
import Base from './base.js'

export default class Inva extends BaseModel {
  public static table = 'invas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare celular: string

  @column()
  declare situacaoInvaId: number

  @column()
  declare baseId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => SituacaoInva, {
    foreignKey: 'situacaoInvaId',
  })
  declare situacaoInva: BelongsTo<typeof SituacaoInva>

  @belongsTo(() => Base, {
    foreignKey: 'baseId',
  })
  declare base: BelongsTo<typeof Base>

  @hasMany(() => Restricao, {
    foreignKey: 'invaId',
  })
  declare restricoes: HasMany<typeof Restricao>
}
