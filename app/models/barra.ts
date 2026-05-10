import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import ModeloAeronave from '#models/modelo_aeronave'
import Base from '#models/base'
import Restricao from '#models/restricao'

export default class Barra extends BaseModel {
  public static table = 'barras'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare baseId: number | null

  @column()
  declare modeloAeronaveId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ModeloAeronave, {
    foreignKey: 'modeloAeronaveId',
  })
  declare modeloAeronave: BelongsTo<typeof ModeloAeronave>

  @belongsTo(() => Base, {
    foreignKey: 'baseId',
  })
  declare base: BelongsTo<typeof Base>

  @hasMany(() => Restricao, {
    foreignKey: 'barraId',
  })
  declare restricoes: HasMany<typeof Restricao>
}
