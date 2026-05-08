import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import ModeloAeronave from './modelo_aeronave.js'
import Slot from './slot.js'
import Restricao from './restricao.js'

export default class Aeronave extends BaseModel {
  public static table = 'aeronaves'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare modeloAeronaveId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ModeloAeronave, {
    foreignKey: 'modeloAeronaveId',
  })
  declare modeloAeronave: BelongsTo<typeof ModeloAeronave>

  @hasMany(() => Slot, {
    foreignKey: 'aeronaveId',
  })
  declare slots: HasMany<typeof Slot>

  @hasMany(() => Restricao, {
    foreignKey: 'aeronaveId',
  })
  declare restricoes: HasMany<typeof Restricao>
}
