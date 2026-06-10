import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'barras_horarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('hora').notNullable()
      table.boolean('ativo').notNullable().defaultTo(true)
      table
        .integer('barra_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('barras')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
