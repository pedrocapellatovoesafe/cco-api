import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'escala_trabalhos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('data').notNullable()
      table.enum('periodo', ['m', 't', 'n', 'x']).notNullable()
      table
        .integer('tipo_disponibilidade_id')
        .unsigned()
        .references('id')
        .inTable('tipo_disponibilidades')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('inva_id')
        .unsigned()
        .references('id')
        .inTable('invas')
        .onDelete('CASCADE')
        .notNullable()
      table.string('motivo').defaultTo('')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
