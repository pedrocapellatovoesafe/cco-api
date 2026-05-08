import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CcoSeeder from './CcoSeeder.js'

export default class DatabaseSeeder extends BaseSeeder {
  async run() {
    await new CcoSeeder(this.client).run()
  }
}