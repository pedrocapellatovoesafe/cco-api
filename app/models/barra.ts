import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import ModeloAeronave from '#models/modelo_aeronave'
import Base from '#models/base'
import Restricao from '#models/restricao'
import BarraHorario from '#models/barra_horario'
import Inva from './inva.js'
import InvaBarra from './inva_barra.js'

export default class Barra extends BaseModel {
  public static table = 'barras'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare ativo: boolean

  @column()
  declare baseId: number | null

  @column()
  declare modeloAeronaveId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ModeloAeronave, {
    foreignKey: 'modeloAeronaveId',
  })
  declare modeloAeronave: BelongsTo<typeof ModeloAeronave>

  @belongsTo(() => Base, {
    foreignKey: 'baseId',
  })
  declare base: BelongsTo<typeof Base>

  @hasMany(() => Restricao, {
    foreignKey: 'barraId',
  })
  declare restricoes: HasMany<typeof Restricao>

  @hasMany(() => BarraHorario, {
    foreignKey: 'barraId',
  })
  declare horarios: HasMany<typeof BarraHorario>

  @manyToMany(() => Inva, {
    pivotTable: 'inva_barras',
    pivotForeignKey: 'barra_id',
    pivotRelatedForeignKey: 'inva_id',
    pivotTimestamps: true,
  })
  declare invas: ManyToMany<typeof Inva>

  @hasMany(() => InvaBarra, {
    foreignKey: 'barraId',
  })
  declare invaBarras: HasMany<typeof InvaBarra>
}
