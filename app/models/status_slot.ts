import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Slot from './slot.js'

export default class StatusSlot extends BaseModel {
  public static table = 'status_slots'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Slot, {
    foreignKey: 'statusSlotId',
  })
  declare slots: HasMany<typeof Slot>
}
