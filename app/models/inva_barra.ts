import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Inva from './inva.js'
import Barra from './barra.js'

export default class InvaBarra extends BaseModel {
  public static table = 'inva_barras'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare invaId: number

  @column()
  declare barraId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Inva, {
    foreignKey: 'invaId',
  })
  declare inva: BelongsTo<typeof Inva>

  @belongsTo(() => Barra, {
    foreignKey: 'barraId',
  })
  declare barra: BelongsTo<typeof Barra>
}
