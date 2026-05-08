import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restricoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('inva_id').unsigned().nullable().references('id').inTable('invas').onDelete('CASCADE')
      table.integer('aeronave_id').unsigned().nullable().references('id').inTable('aeronaves').onDelete('CASCADE')
      table.integer('modelo_aeronave_id').unsigned().nullable().references('id').inTable('modelos_aeronave').onDelete('CASCADE')
      table.integer('aluno_id').unsigned().nullable().references('id').inTable('alunos').onDelete('CASCADE')
      table.integer('missao_id').unsigned().nullable().references('id').inTable('missoes').onDelete('CASCADE')
      table.text('observacao').nullable()
      table.boolean('is_inva').defaultTo(false)
      table.boolean('is_aluno').defaultTo(false)
      table.boolean('is_aluno_inva').defaultTo(false)
      table.boolean('is_modelo').defaultTo(false)
      table.boolean('is_aeronave').defaultTo(false)
      table.boolean('is_missao').defaultTo(false)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
