import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'slots'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('barra_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('barras')
        .onDelete('SET NULL')
      table
        .integer('status_slot_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('status_slots')
        .onDelete('CASCADE')
      table
        .integer('aeronave_id')
        .unsigned()
        .references('id')
        .inTable('aeronaves')
        .onDelete('CASCADE')
      table.integer('aluno_id').unsigned().references('id').inTable('alunos').onDelete('CASCADE')
      table.integer('inva_id').unsigned().references('id').inTable('invas').onDelete('CASCADE')
      table.integer('missao_id').unsigned().references('id').inTable('missoes').onDelete('CASCADE')
      table.dateTime('data_hora').nullable()
      table.string('observacoes', 500).defaultTo(null)
      table.boolean('is_checked').defaultTo(false).notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
