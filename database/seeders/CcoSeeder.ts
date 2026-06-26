import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import SituacaoInva from '#models/situacao_inva'
import ModeloAeronave from '#models/modelo_aeronave'
import Base from '#models/base'
import StatusSlot from '#models/status_slot'
import Aeronave from '#models/aeronave'
import Inva from '#models/inva'
import Barra from '#models/barra'
import Aluno from '#models/aluno'
import TipoDisponibilidade from '#models/tipo_disponibilidade'
import BarraHorario from '#models/barra_horario'
import InvaBarra from '#models/inva_barra'
import env from '#start/env'

export default class CcoSeeder extends BaseSeeder {
  async run() {
    const defaultPassword = env.get('SEED_USER_PASSWORD')

    // 1. Usuários
    await User.updateOrCreate(
      { email: 'pedro.capellato@voesafe.com.br' },
      {
        fullName: 'Pedro Henrique Capellato Jardim',
        email: 'pedro.capellato@voesafe.com.br',
        password: defaultPassword,
      }
    )

    await User.updateOrCreate(
      { email: 'cco@voesafe.com.br' },
      {
        fullName: 'CCO',
        email: 'cco@voesafe.com.br',
        password: defaultPassword,
      }
    )

    // 2. Situações Inva
    const situacoes = ['clt_full', 'eventual', 'solo', 'clt_part', 'checador']
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
    const statusSlots = [
      'CONFIRMADO',
      'PENDENTE',
      'AGUARDANDO CONFIRMAÇÃO',
      'METEOROLOGIA',
      'OPERAÇÕES',
      'REVISÃO',
      'MANUTENÇÃO',
    ]
    for (const nome of statusSlots) {
      await StatusSlot.updateOrCreate({ nome }, { nome })
    }

    // 6.Aluno
    await Aluno.updateOrCreate(
      { nome: 'ALUNO TESTE' },
      {
        nome: 'ALUNO TESTE',
        cpf: '12345678901',
        celular: '12988888888',
      }
    )

    // 7. Aeronaves
    const aeronavesData = [
      { nome: 'PS-SFE', modelo: 'MC01' },
      { nome: 'PS-LOM', modelo: 'MC01' },
      { nome: 'PS-SFH', modelo: 'MC01' },
      { nome: 'PS-SFI', modelo: 'MC01' },
      { nome: 'PS-SFJ', modelo: 'COLT' },
      { nome: 'PS-SFL', modelo: 'COLT' },
      { nome: 'PS-SFP', modelo: 'SIRA' },
      { nome: 'PC-SJK', modelo: 'SM PCATD' },
      { nome: 'PC-CPQ', modelo: 'SM PCATD' },
      { nome: 'SM-SJK', modelo: 'SM AATD' },
      { nome: 'SM-CPQ', modelo: 'SM AATD' },
    ]
    for (const { nome, modelo } of aeronavesData) {
      const modeloInstance = await ModeloAeronave.findByOrFail('nome', modelo)
      await Aeronave.updateOrCreate(
        { nome },
        {
          nome,
          modeloAeronaveId: modeloInstance.id,
        }
      )
    }

    // 7. Invas
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
      { nome: 'ABBEGG', situacao: 'clt_full', base: 'CPQ' },
      { nome: 'IGOR', situacao: 'clt_part', base: 'CPQ' },
      { nome: 'PEDRO SALES', situacao: 'clt_part', base: 'CPQ' },
      { nome: 'LANY', situacao: 'eventual', base: 'CPQ' },
      { nome: 'EDUARDO GEVINSKI', situacao: 'eventual', base: 'CPQ' },
      { nome: 'IAN FRANCISCO GAIECKI OLIVEIRA', situacao: 'eventual', base: 'CPQ' },
      { nome: 'JOSÉ FELIPE DE CAMARGO BARROS NETO', situacao: 'eventual', base: 'CPQ' },
      { nome: 'LUIZ QUAGLIA', situacao: 'eventual', base: 'CPQ' },
      { nome: 'PAIVA', situacao: 'eventual', base: 'CPQ' },
      { nome: 'CAIQUE DUARTE', situacao: 'solo', base: 'SJK' },
      { nome: 'RODRIGO NASCIMENTO', situacao: 'solo', base: 'SJK' },
      { nome: 'RODRIGO MELO', situacao: 'solo', base: 'SJK' },
      { nome: 'PEDRO LUCAS', situacao: 'solo', base: 'SJK' },
      { nome: 'EDUARDO RAHMAN', situacao: 'solo', base: 'SJK' },
      { nome: 'VICTOR DE PINHO', situacao: 'solo', base: 'SJK' },
      { nome: 'ERIK SUZUKI', situacao: 'solo', base: 'SJK' },
      { nome: 'WILLARD QUEIROZ', situacao: 'solo', base: 'SJK' },
      { nome: 'STEPHANIE BRUNO', situacao: 'solo', base: 'CPQ' },
      { nome: 'THEO SILVA', situacao: 'solo', base: 'CPQ' },
      { nome: 'JHONY BINATTO', situacao: 'solo', base: 'CPQ' },
      { nome: 'BERNARDO FERREIRA', situacao: 'solo', base: 'CPQ' },
      { nome: 'GABRIEL ANDRADE', situacao: 'solo', base: 'CPQ' },
      { nome: 'GABRIEL COMARELLA', situacao: 'solo', base: 'CPQ' },
      { nome: 'ANDRE OLIVEIRA', situacao: 'checador', base: 'CPQ' },
      { nome: 'PISANI', situacao: 'checador', base: 'SJK' },
    ]
    for (const { nome, situacao, base } of invasData) {
      const situacaoInstance = await SituacaoInva.findByOrFail('nome', situacao)
      const baseInstance = await Base.findByOrFail('nome', base)
      await Inva.updateOrCreate(
        { nome },
        {
          nome,
          celular: '', // Assuming empty, as not provided
          situacaoInvaId: situacaoInstance.id,
          baseId: baseInstance.id,
        }
      )
    }

    // 8. Barras
    const dadosBarras = [
      { nome: 'MC-01 (SJK) #1', modelo: 'MC01', baseId: 1 },
      { nome: 'MC01 (SJK) (DIURNO) #2', modelo: 'MC01', baseId: 1 },
      { nome: 'MC01 - BACKUP #3', modelo: 'MC01', baseId: 1 },
      { nome: 'SIRA (SJK) #4', modelo: 'SIRA', baseId: 1 },
      { nome: 'SIM PCATD - SBSJ #5', modelo: 'SM PCATD', baseId: 1 },
      { nome: 'SM AATD SJK #6', modelo: 'SM AATD', baseId: 1 },
      { nome: 'SIM AATD CPQ #10', modelo: 'SM AATD', baseId: 2 },
      { nome: 'SIM PCATD - SDAM #8', modelo: 'SM PCATD', baseId: 2 },
      { nome: 'COLT #11', modelo: 'COLT', baseId: 2 },
      { nome: 'COLT DIURNO #12', modelo: 'COLT', baseId: 2 },
      { nome: 'MC01 (CPQ) #13', modelo: 'MC01', baseId: 2 },
      { nome: 'MC01 (CPQ) (DIURNO) #14', modelo: 'MC01', baseId: 2 },
    ]

    for (const { nome, modelo, baseId } of dadosBarras) {
      const modeloInstance = await ModeloAeronave.findByOrFail('nome', modelo)
      await Barra.updateOrCreate(
        { nome },
        {
          nome,
          modeloAeronaveId: modeloInstance.id,
          baseId,
        }
      )
    }

    // 9. Tipo de disponibilidade
    const tipos = [
      'Disponivel',
      'Folga Regular',
      'Folga Social',
      'Sobreaviso',
      'Treinamento',
      'Férias',
      'Banco de Horas',
      'Operações',
      'Trabalho Externo',
      'Dispensa Médica',
      'Não Especificado',
    ]

    for (const nome of tipos) {
      await TipoDisponibilidade.updateOrCreate({ nome }, { nome })
    }

    // 10. Horários das Barras
    const horariosBase1 = ['07:45', '09:45', '11:45', '13:45', '15:45', '17:45']
    const horariosBase2 = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00']

    const barras = await Barra.all()
    for (const barra of barras) {
      const horarios = barra.baseId === 1 ? horariosBase1 : horariosBase2
      for (const hora of horarios) {
        await BarraHorario.updateOrCreate(
          { barraId: barra.id, hora },
          { barraId: barra.id, hora, ativo: true }
        )
      }
    }

    // 11. Relacionar Invas e Barras pela Base (muitos para muitos)
    const allInvas = await Inva.all()
    const allBarras = await Barra.all()
    
    for (const inva of allInvas) {
      if (!inva.baseId) continue
      
      const matchingBarras = allBarras.filter((b) => b.baseId === inva.baseId)
      for (const barra of matchingBarras) {
        await InvaBarra.updateOrCreate(
          { invaId: inva.id, barraId: barra.id },
          { invaId: inva.id, barraId: barra.id }
        )
      }
    }
  }
}
