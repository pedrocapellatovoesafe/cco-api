import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import SituacaoInva from './situacao_inva.js'
import Restricao from './restricao.js'
import Base from './base.js'
import EscalaTrabalho from './escala_trabalho.js'
import Barra from './barra.js'
import InvaBarra from './inva_barra.js'

export default class Inva extends BaseModel {
  public static table = 'invas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column({ serializeAs: null })
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

  @hasMany(() => EscalaTrabalho, {
    foreignKey: 'invaId',
  })
  declare escalas: HasMany<typeof EscalaTrabalho>

  @manyToMany(() => Barra, {
    pivotTable: 'inva_barras',
    pivotForeignKey: 'inva_id',
    pivotRelatedForeignKey: 'barra_id',
    pivotTimestamps: true,
  })
  declare barras: ManyToMany<typeof Barra>

  @hasMany(() => InvaBarra, {
    foreignKey: 'invaId',
  })
  declare invaBarras: HasMany<typeof InvaBarra>
}
