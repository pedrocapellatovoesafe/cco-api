import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('nome').notNullable()
      table.string('celular').notNullable()
      table
        .integer('situacao_inva_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('situacoes_inva')
        .onDelete('CASCADE')
      table
        .integer('base_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('bases')
        .onDelete('SET NULL')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
