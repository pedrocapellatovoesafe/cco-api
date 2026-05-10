import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import TipoDisponibilidade from './tipo_disponibilidade.js'
import Inva from './inva.js'

export default class EscalaTrabalho extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.date()
  declare data: DateTime

  @column()
  declare periodo: 'm' | 't' | 'n' | 'x'

  @column()
  declare tipoDisponibilidadeId: number

  @column()
  declare invaId: number

  @column()
  declare motivo: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => TipoDisponibilidade)
  declare tipoDisponibilidade: BelongsTo<typeof TipoDisponibilidade>

  @belongsTo(() => Inva)
  declare inva: BelongsTo<typeof Inva>
}
