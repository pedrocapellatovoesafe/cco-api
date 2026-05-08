import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import SituacaoInva from '#models/situacao_inva'
import ModeloAeronave from '#models/modelo_aeronave'
import Base from '#models/base'
import StatusSlot from '#models/status_slot'
import Curso from '#models/curso'
import Aeronave from '#models/aeronave'
import Missao from '#models/missao'
import Inva from '#models/inva'
import Barra from '#models/barra'
import Aluno from '#models/aluno'
import hash from '@adonisjs/core/services/hash'

export default class CcoSeeder extends BaseSeeder {
  async run() {
    // 1. Usuários
    await User.updateOrCreate({ email: 'pedro.capellato@voesafe.com.br' }, {
      fullName: 'Pedro Henrique Capellato Jardim',
      email: 'pedro.capellato@voesafe.com.br',
      password: 'Safe1234%'
    })

    await User.updateOrCreate({ email: 'cco@voesafe.com.br' }, {
      fullName: 'CCO',
      email: 'cco@voesafe.com.br',
      password: 'Safe1234%'
    })

    // 2. Situações Inva
    const situacoes = ['clt_full', 'eventual', 'solo', 'clt_part']
    for (const nome of situacoes) {
      await SituacaoInva.updateOrCreate({ nome }, { nome })
    }

    // 3. Modelos Aeronaves
    const modelos = ['MC01', 'COLT', 'SIRA', 'SM PCATD', 'SM AATD']
    for (const nome of modelos) {
      await ModeloAeronave.updateOrCreate({ nome }, { nome })
    }

    // 4. Bases
    const basesNomes = ['SJK', 'CPQ']
    for (const nome of basesNomes) {
      await Base.updateOrCreate({ nome }, { nome })
    }

    // 5. Status Slots
    const statusSlots = ['CONFIRMADO', 'PENDENTE', 'AGUARDANDO CONFIRMAÇÃO', 'OPERAÇÕES', 'REVISÃO', 'MANUTENÇÃO']
    for (const nome of statusSlots) {
      await StatusSlot.updateOrCreate({ nome }, { nome })
    }

    // 6. Cursos
    const cursos = ['PPA - Pratico', 'PC/IFRA', 'INVA']
    for (const nome of cursos) {
      await Curso.updateOrCreate({ nome }, { nome })
    }

    // Aluno
    await Aluno.updateOrCreate({
        nome: 'ALUNO TESTE',
        cpf: '12345678901',
        celular: '12988888888'
    })

    // 7. Aeronaves
    const aeronavesData = [
      { nome: 'PSSFE', modelo: 'MC01' },
      { nome: 'PSLOM', modelo: 'MC01' },
      { nome: 'PSSFH', modelo: 'MC01' },
      { nome: 'PSSFI', modelo: 'MC01' },
      { nome: 'PSSFJ', modelo: 'COLT' },
      { nome: 'PSSFL', modelo: 'MC01' },
      { nome: 'PSSFP', modelo: 'SIRA' },
    ]
    for (const { nome, modelo } of aeronavesData) {
      const modeloInstance = await ModeloAeronave.findByOrFail('nome', modelo)
      await Aeronave.updateOrCreate({ nome }, {
        nome,
        modeloAeronaveId: modeloInstance.id,
      })
    }

    // 8. Missões
    const cursoPpa = await Curso.findByOrFail('nome', 'PPA - Pratico')
    const missoes = [
      'Mockup 04 - PCATD', 'CHEQUE ANAC', 'Currículo de Solo', 'Mockup 01', 'Mockup 02', 'Mockup 03',
      'PS01', 'PS02', 'PS03', 'PS04', 'PS05', 'PS06', 'PS07', 'PS08', 'PS09', 'PS10', 'PS11', 'PS12', 'PS13',
      'Readaptação PS', 'PSR1 (Recuperação da PS12)', 'PS13 INATIVO', 'PS15 [desativada]', 'PS16-1 [desativada]',
      'PS16-2 [desativada]', 'PS16-3 [desativada]', 'PS16-4 [desativada]', 'PS16-5 [desativada]', 'PS16 [desativada]',
      'PS17 [desativada]', 'PS18 [desativada]', 'PS19 [desativada]', 'PS-X1 [desativada]', 'AP01', 'AP02', 'AP03',
      'AP04', 'AP05', 'Readaptação AP', 'AP03 DC', 'AP07 [desativada]', 'AP08 [desativada]', 'AP09 [desativada]',
      'AP-X1 [desativada]', 'SIM NAV VFR', 'NAV01', 'NAV02', 'NAV03', 'NAV04', 'NAV05', 'Readaptação NAV',
      'Monitoria NAV VFR', 'SIM IFR', 'Simulador PCATD', 'NOT01', 'NOT02', 'Avaliação Final', 'Cheque ANAC - PP',
      'Reforço - Avaliação Final'
    ]
    for (const nome of missoes) {
      await Missao.updateOrCreate({ nome }, {
        nome,
        cursoId: cursoPpa.id,
      })
    }

    // 9. Invas
    const invasData = [
      { nome: 'KEVIN ARAÚJO WAJIMA', situacao: 'clt_full', base: 'SJK' },
      { nome: 'DIEGO SOARES GONÇALVES', situacao: 'clt_full', base: 'SJK' },
      { nome: 'DALAQUA', situacao: 'clt_part', base: 'SJK' },
      { nome: 'DANILO LIRA SILVEIRA', situacao: 'eventual', base: 'SJK' },
      { nome: 'KLEBER RICARDO DE MIRANDA', situacao: 'eventual', base: 'SJK' },
      { nome: 'VIVIAN XAVIER CAVALCANTE', situacao: 'eventual', base: 'SJK' },
      { nome: 'BERNARDO BANDEIRA', situacao: 'eventual', base: 'SJK' },
      { nome: 'ISABELA GARCIA', situacao: 'eventual', base: 'SJK' },
      { nome: 'DANIEL BRUM', situacao: 'eventual', base: 'SJK' },
      { nome: 'MAYSON DE VICENTE DOS SANTOS', situacao: 'eventual', base: 'SJK' },
      { nome: 'LUAN SANTANA', situacao: 'eventual', base: 'SJK' },
      { nome: 'CAIQUE DUARTE', situacao: 'solo', base: 'SJK' },
      { nome: 'RODRIGO NASCIMENTO', situacao: 'solo', base: 'SJK' },
      { nome: 'RODRIGO MELO', situacao: 'solo', base: 'SJK' },
      { nome: 'PEDRO LUCAS', situacao: 'solo', base: 'SJK' },
      { nome: 'EDUARDO RAHMAN', situacao: 'solo', base: 'SJK' },
      { nome: 'VICTOR DE PINHO', situacao: 'solo', base: 'SJK' },
      { nome: 'ERIK SUZUKI', situacao: 'solo', base: 'SJK' },
      { nome: 'WILLARD QUEIROZ', situacao: 'solo', base: 'SJK' },
      { nome: 'ABBEGG', situacao: 'clt_full', base: 'CPQ' },
      { nome: 'IGOR', situacao: 'clt_part', base: 'CPQ' },
      { nome: 'PEDRO SALES', situacao: 'clt_part', base: 'CPQ' },
      { nome: 'LANY', situacao: 'eventual', base: 'CPQ' },
      { nome: 'EDUARDO GEVINSKI', situacao: 'eventual', base: 'CPQ' },
      { nome: 'IAN FRANCISCO GAIECKI OLIVEIRA', situacao: 'eventual', base: 'CPQ' },
      { nome: 'JOSÉ FELIPE DE CAMARGO BARROS NETO', situacao: 'eventual', base: 'CPQ' },
      { nome: 'LUIZ QUAGLIA', situacao: 'eventual', base: 'CPQ' },
      { nome: 'STEPHANIE BRUNO', situacao: 'solo', base: 'CPQ' },
      { nome: 'THEO SILVA', situacao: 'solo', base: 'CPQ' },
      { nome: 'JHONY BINATTO', situacao: 'solo', base: 'CPQ' },
      { nome: 'BERNARDO FERREIRA', situacao: 'solo', base: 'CPQ' },
      { nome: 'GABRIEL ANDRADE', situacao: 'solo', base: 'CPQ' },
      { nome: 'GABRIEL COMARELLA', situacao: 'solo', base: 'CPQ' },
    ]
    for (const { nome, situacao, base } of invasData) {
      const situacaoInstance = await SituacaoInva.findByOrFail('nome', situacao)
      const baseInstance = await Base.findByOrFail('nome', base)
      await Inva.updateOrCreate({ nome }, {
        nome,
        celular: '', // Assuming empty, as not provided
        situacaoInvaId: situacaoInstance.id,
        baseId: baseInstance.id,
      })
    }

    const dadosBarras = [
      { nome: 'MC-01 (SJK)', modelo: 'MC01' },
      { nome: 'MC01 (SJK) (DIURNO)', modelo: 'MC01' },
      { nome: 'MC01 - BACKUP', modelo: 'MC01' },
      { nome: 'SIRA (SJK)', modelo: 'SIRA' },
      { nome: 'SIM PCATD - SBSJ', modelo: 'SM PCATD' },
      { nome: 'SM AATD SJK', modelo: 'SM AATD' },
      { nome: 'SIM AATD CPQ', modelo: 'SM AATD' },
      { nome: 'SIM PCATD - SDAM', modelo: 'SM PCATD' },
      { nome: 'COLT', modelo: 'COLT' },
      { nome: 'COLT DIURNO', modelo: 'COLT' },
      { nome: 'MC01 (CPQ)', modelo: 'MC01' }
    ]

    for (const { nome, modelo } of dadosBarras) {
      const modeloInstance = await ModeloAeronave.findByOrFail('nome', modelo)
      await Barra.updateOrCreate({ nome }, {
        nome,
        modeloAeronaveId: modeloInstance.id,
      })
    }
}
}
