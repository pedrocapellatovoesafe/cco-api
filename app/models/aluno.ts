import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Slot from './slot.js'
import Restricao from './restricao.js'

export default class Aluno extends BaseModel {
  public static table = 'alunos'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @column()
  declare celular: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Slot, {
    foreignKey: 'alunoId',
  })
  declare slots: HasMany<typeof Slot>

  @hasMany(() => Restricao, {
    foreignKey: 'alunoId',
  })
  declare restricoes: HasMany<typeof Restricao>
}
