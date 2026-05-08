import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Inva from './inva.js'

export default class SituacaoInva extends BaseModel {
  public static table = 'situacoes_inva'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Inva, {
    foreignKey: 'situacaoInvaId',
  })
  declare invas: HasMany<typeof Inva>
}
