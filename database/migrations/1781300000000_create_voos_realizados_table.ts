import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'voos_realizados'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('cavok_id').unsigned().notNullable().unique()
      table.string('tipo_voo_financeiro').nullable()
      table.string('missao').nullable()
      table.string('instrutor').nullable()
      table.string('aeronave').nullable()
      table.string('aluno').nullable()
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
