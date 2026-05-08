import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Curso from './curso.js'
import Slot from './slot.js'
import Restricao from './restricao.js'

export default class Missao extends BaseModel {
  public static table = 'missoes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cursoId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Curso, {
    foreignKey: 'cursoId',
  })
  declare curso: BelongsTo<typeof Curso>

  @hasMany(() => Slot, {
    foreignKey: 'missaoId',
  })
  declare slots: HasMany<typeof Slot>

  @hasMany(() => Restricao, {
    foreignKey: 'missaoId',
  })
  declare restricoes: HasMany<typeof Restricao>
}
