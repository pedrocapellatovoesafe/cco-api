import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import StatusSlot from './status_slot.js'
import Aeronave from './aeronave.js'
import Inva from './inva.ts'
import Aluno from './aluno.js'
import Missao from './missao.js'
import Barra from './barra.js'

export default class Slot extends BaseModel {
  public static table = 'slots'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare statusSlotId: number

  @column()
  declare aeronaveId: number | null

  @column()
  declare alunoId: number | null

  @column()
  declare missaoId: number | null

  @column()
  declare invaId: number | null

  @column()
  declare barraId: number | null

  @column()
  declare observacoes: string | null

  @column()
  declare isChecked: boolean

  @column.dateTime({
    serialize: (value: DateTime) => value.toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"),
  })
  declare dataHora: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => StatusSlot, {
    foreignKey: 'statusSlotId',
  })
  declare statusSlot: BelongsTo<typeof StatusSlot>

  @belongsTo(() => Inva, {
    foreignKey: 'invaId',
  })
  declare inva: BelongsTo<typeof Inva>

  @belongsTo(() => Aeronave, {
    foreignKey: 'aeronaveId',
  })
  declare aeronave: BelongsTo<typeof Aeronave>

  @belongsTo(() => Aluno, {
    foreignKey: 'alunoId',
  })
  declare aluno: BelongsTo<typeof Aluno>

  @belongsTo(() => Barra, {
    foreignKey: 'barraId',
  })
  declare barra: BelongsTo<typeof Barra>

  @belongsTo(() => Missao, {
    foreignKey: 'missaoId',
  })
  declare missao: BelongsTo<typeof Missao>
}
