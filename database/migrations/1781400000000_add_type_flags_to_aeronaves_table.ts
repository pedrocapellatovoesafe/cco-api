import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'aeronaves'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('tipo_aeronave').defaultTo(true).notNullable()
      table.boolean('tipo_simulador').defaultTo(false).notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('tipo_aeronave')
      table.dropColumn('tipo_simulador')
    })
  }
}
