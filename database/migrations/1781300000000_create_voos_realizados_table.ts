import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'voos_realizados'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('cavok_id').unsigned().notNullable().unique()
      table.string('tipo_voo_financeiro').nullable()
      
      table
        .integer('missao_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('missoes')
        .onDelete('SET NULL')

      table
        .integer('inva_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('invas')
        .onDelete('SET NULL')

      table
        .integer('aeronave_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('aeronaves')
        .onDelete('SET NULL')

      table
        .integer('aluno_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('alunos')
        .onDelete('SET NULL')

      table.double('tempo_total_voo').nullable()
      table.integer('abastecimento').nullable()
      table.string('data').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
