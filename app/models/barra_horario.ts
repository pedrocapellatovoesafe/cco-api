import { BarrasHorarioSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Barra from './barra.js'

export default class BarraHorario extends BarrasHorarioSchema {
  public static table = 'barras_horarios'

  @belongsTo(() => Barra, {
    foreignKey: 'barraId',
  })
  declare barra: BelongsTo<typeof Barra>
}
