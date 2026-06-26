import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inva_barras'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      
      table
        .integer('inva_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('invas')
        .onDelete('CASCADE')
      
      table
        .integer('barra_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('barras')
        .onDelete('CASCADE')

      // Ensure unique constraint to avoid duplicate associations
      table.unique(['inva_id', 'barra_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
