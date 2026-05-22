import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CcoSeeder from './CcoSeeder.js'
import CoursesSeed from './CoursesSeed.js'
import RestricaoSeeder from './restricao_seeder.js'

export default class DatabaseSeeder extends BaseSeeder {
  async run() {
    await new CcoSeeder(this.client).run()
    await new CoursesSeed(this.client).run()
    // Aguardar uma melhor implementação do RestricaoSeeder para evitar retrabalho de inserção no frontend
    // await new RestricaoSeeder(this.client).run()
  }
}
