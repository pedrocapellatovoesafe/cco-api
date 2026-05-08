import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Aeronave from './aeronave.js'
import Restricao from './restricao.js'

export default class ModeloAeronave extends BaseModel {
  public static table = 'modelos_aeronave'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Aeronave, {
    foreignKey: 'modeloAeronaveId',
  })
  declare aeronaves: HasMany<typeof Aeronave>

  @hasMany(() => Restricao, {
    foreignKey: 'modeloAeronaveId',
  })
  declare restricoes: HasMany<typeof Restricao>
}
