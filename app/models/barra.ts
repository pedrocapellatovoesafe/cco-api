import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import ModeloAeronave from '#models/modelo_aeronave'
import Restricao from '#models/restricao'

export default class Barra extends BaseModel {
  public static table = 'barras'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column({ serializeAs: null })
  declare modeloAeronaveId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ModeloAeronave, {
    foreignKey: 'modeloAeronaveId',
  })
  declare modeloAeronave: BelongsTo<typeof ModeloAeronave>

  @hasMany(() => Restricao, {
    foreignKey: 'barraId',
  })
  declare restricoes: HasMany<typeof Restricao>
}
