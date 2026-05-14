import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Curso from '#models/curso'
import Missao from '#models/missao'

export default class CoursesSeed extends BaseSeeder {
  async run() {
    // 1. Cursos
    const cursos = ['PPA - Pratico', 'PC/IFRA', 'INVA', 'Capacitação do Instrutor de Voo Externo (Prático)',
        'Programa de Aperfeiçoamento de Piloto SAFE (Prático)', 'Voo Incentivo (Prático)'
    ]
    for (const nome of cursos) {
      await Curso.updateOrCreate({ nome }, { nome })
    }

    // 2. Missões
    const cursoPpa = await Curso.findByOrFail('nome', 'PPA - Pratico')
    const cursoPca = await Curso.findByOrFail('nome', 'PC/IFRA')
    const cursoInva = await Curso.findByOrFail('nome', 'INVA')
    const cursoCapacitacao = await Curso.findByOrFail('nome', 'Capacitação do Instrutor de Voo Externo (Prático)')
    const cursoPrograma = await Curso.findByOrFail('nome', 'Programa de Aperfeiçoamento de Piloto SAFE (Prático)')
    const cursoIncentivo = await Curso.findByOrFail('nome', 'Voo Incentivo (Prático)')

    const missoes = [
      'Mockup 04 - PCATD', 'CHEQUE ANAC', 'Currículo de Solo', 'Mockup 01', 'Mockup 02', 'Mockup 03',
      'PS01', 'PS02', 'PS03', 'PS04', 'PS05', 'PS06', 'PS07', 'PS08', 'PS09', 'PS10', 'PS11', 'PS12', 'PS13',
      'Readaptação PS', 'PSR1 (Recuperação da PS12)', 'PS13 INATIVO', 'PS15 [desativada]', 'PS16-1 [desativada]',
      'PS16-2 [desativada]', 'PS16-3 [desativada]', 'PS16-4 [desativada]', 'PS16-5 [desativada]', 'PS16 [desativada]',
      'PS17 [desativada]', 'PS18 [desativada]', 'PS19 [desativada]', 'PS-X1 [desativada]', 'AP01', 'AP02', 'AP03',
      'AP04', 'AP05', 'Readaptação AP', 'AP03 DC', 'AP07 [desativada]', 'AP08 [desativada]', 'AP09 [desativada]',
      'AP-X1 [desativada]', 'SIM NAV VFR', 'NAV01', 'NAV02', 'NAV03', 'NAV04', 'NAV05', 'Readaptação NAV',
      'Monitoria NAV VFR', 'SIM IFR', 'Simulador PCATD', 'NOT01', 'NOT02', 'Avaliação Final', 'Cheque ANAC - PP',
      'Reforço - Avaliação Final']
    for (const nome of missoes) {
      await Missao.updateOrCreate({ nome }, {
        nome,
        cursoId: cursoPpa.id,
      })
    }
    const missoesPca = ['AD 01','AD 02','AD 03','AP 01','AP 02','AP 03',
      'Readaptação','NAV 01','NAV 02','NAV 03','NAV 04','NAV 05','NAV 06','NAV X1','NAV X2','NAV INSTRUTOR','NAV SOLO','NAV MENTOR',
      'NOT 01','NOT 02','NOT 03',
      'LAB 01 - MANOBRAS BÁSICAS','LAB 02 - MANOBRAS BÁSICAS','LAB 03 - MANOBRAS BÁSICAS','LAB 04 - PROCEDIMENTOS E NAVEGAÇÃO','LAB 05 - PROCEDIMENTOS E NAVEGAÇÃO','LAB 06 - PROCEDIMENTOS E NAVEGAÇÃO',
      'SIM 01 - MANOBRAS BÁSICAS','SIM 02 - MANOBRAS BÁSICAS','SIM 03 - USO DE RÁDIO-NAVEGAÇÃO','SIM 04 - USO DE RÁDIO-NAVEGAÇÃO','SIM 05 - USO DE RÁDIO-NAVEGAÇÃO','SIM 06 - USO DE RÁDIO-NAVEGAÇÃO','SIM 07 - PROCEDIMENTOS','SIM 08 - PROCEDIMENTOS','SIM 09 - PROCEDIMENTOS','SIM 10 - PROCEDIMENTOS','SIM 11 - CONTINGÊNCIAS IFR','SIM 12 - NAVEGAÇÃO','SIM 13 - NAVEGAÇÃO','SIM 14 - NAVEGAÇÃO','SIM - AVALIAÇÃO INTERMEDIÁRIA',
      'IFR 01 - MANOBRAS BÁSICAS','IFR 02 - MANOBRAS BÁSICAS','IFR 03 - MANOBRAS BÁSICAS','IFR 04 - NAVEGAÇÃO E PROCEDIMENTOS','IFR 05 - NAVEGAÇÃO E PROCEDIMENTOS','IFR 06 - NAVEGAÇÃO E PROCEDIMENTOS','IFR 07 - NAVEGAÇÃO E PROCEDIMENTOS','IFR 08 - NAVEGAÇÃO E PROCEDIMENTOS','IFR 09 - NAVEGAÇÃO','IFR 10 - NAVEGAÇÃO',
      'AVALIAÇÃO FINAL PARA CHEQUE',
      'CHEQUE ANAC - PC',
      'RECHEQUE ANAC']
    for (const nome of missoesPca) {
          await Missao.updateOrCreate({ nome }, {
          nome,
          cursoId: cursoPca.id,
        })
    }
    const missoesInva = [
      'Mockup 01',
      'Mockup 02',
      'Mockup 03',
      "ADAPTAÇÃO 01",
      "ADAPTAÇÃO 02",
      "ADAPTAÇÃO 03",
      "ADAPTAÇÃO 04",
      "PI 01",
      "PI 02",
      "PI 03",
      "PI 04",
      "PI 05",
      "PI 06",
      "PI 07",
      "PI 08",
      "PI 09",
      "PI 10",
      "NAVEGAÇÃO 01",
      "NAVEGAÇÃO 02",
      "RADIONAVEGAÇÃO E VOO POR INSTRUMENTOS - IFR 01",
      "AVALIAÇÃO FINAL - CHEQUE SAFE",
      "CHEQUE ANAC - INVA"
    ]
    for (const nome of missoesInva) {
      await Missao.updateOrCreate({ nome }, {
        nome,
        cursoId: cursoInva.id,
      })
    }
    const missoesCapacitacao = [
      "ADAPTAÇÃO 01",
      "ADAPTAÇÃO 02",
      "ADAPTAÇÃO 03",
      "ADAPTAÇÃO 04",
      "ADAPTAÇÃO 05 - CHEQUE SAFE",
      "SIM 01 IFR - Manobras básicas",
      "SIM 02 IFR - Navegação",
      "SIM 03 IFR - Nav Loft",
      "Treinamento Inicial",
      "Treinamento em SM-AATD",
      "Inicial Prático - Curso de Formação de Instrutores",
      "Curso de Formação de Instrutores - Revalidação"
    ]
    for (const nome of missoesCapacitacao) {
      await Missao.updateOrCreate({ nome }, {
      nome,
      cursoId: cursoCapacitacao.id,
      })
    }

    await Missao.updateOrCreate({ nome: 'Aperfeiçoamento Contínuo' }, { nome: 'Aperfeiçoamento Contínuo', cursoId: cursoPrograma.id })
    await Missao.updateOrCreate({ nome: 'Voo incentivo' }, { nome: 'Voo incentivo', cursoId: cursoIncentivo.id })
}
}
