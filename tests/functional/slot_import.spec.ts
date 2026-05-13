import { test } from '@japa/runner'
import User from '#models/user'
import StatusSlot from '#models/status_slot'
import Barra from '#models/barra'
import ModeloAeronave from '#models/modelo_aeronave'
import Base from '#models/base'
import Slot from '#models/slot'
import { DateTime } from 'luxon'

test.group('Slot Import', (group) => {
  group.each.setup(async () => {
    // No projeto Adonis 6, o testUtils pode ser usado para gerenciar o banco
    // Mas aqui vamos apenas limpar as tabelas relevantes se necessário
    // Ou confiar que o banco de teste está limpo a cada execução
  })

  test('it should update existing slot and set isChecked to false', async ({ client, assert }) => {
    // 1. Setup - Criar dados básicos
    const user = await User.create({
      fullName: 'Test User',
      email: 'test' + Math.random() + '@example.com',
      password: 'password',
    })

    const modelo = await ModeloAeronave.create({ nome: 'MODELO TESTE ' + Math.random() })
    const base = await Base.create({ nome: 'BASE TESTE ' + Math.random() })
    const status = await StatusSlot.create({ nome: 'CONFIRMADO' })
    const barra = await Barra.create({ 
      nome: 'BARRA TESTE ' + Math.random(), 
      modeloAeronaveId: modelo.id,
      baseId: base.id 
    })

    const dataHoraStr = '2026-05-13 10:00'
    const dataHora = DateTime.fromFormat(dataHoraStr, 'yyyy-MM-dd HH:mm', { zone: 'America/Sao_Paulo' }).toUTC()

    // 2. Criar um slot existente com isChecked = true
    const existingSlot = await Slot.create({
      dataHora,
      barraId: barra.id,
      statusSlotId: status.id,
      isChecked: true,
    })

    // 3. Preparar payload de importação que coincide com o slot existente
    const importData = {
      slots: [
        {
          data: '13/05/2026',
          hora: '10:00',
          barra: barra.nome,
          st: 'CONFIRMADO',
          id: 1,
        }
      ]
    }

    // 4. Executar importação
    const response = await client
      .post('/api/v1/slots/import')
      .loginAs(user)
      .json(importData)

    // 5. Verificações
    response.assertStatus(200)
    
    // Verificamos que o slot original foi removido (pois a importação agora limpa tudo)
    const oldSlot = await Slot.find(existingSlot.id)
    assert.isNull(oldSlot, 'O slot original deveria ter sido removido')

    // Verificamos que o novo slot foi criado para o mesmo horário
    const targetDataHora = DateTime.fromFormat('13/05/2026 10:00', 'dd/MM/yyyy HH:mm', { zone: 'America/Sao_Paulo' })
    const allSlots = await Slot.query().where('barraId', barra.id)
    const newSlot = allSlots.find(s => s.dataHora?.toMillis() === targetDataHora.toMillis())

    assert.exists(newSlot, 'Um novo slot deveria ter sido criado')
    assert.equal(newSlot?.isChecked, false, 'O novo slot deveria estar com isChecked = false')
  })

  test('it should create new slot and set isChecked to false', async ({ client, assert }) => {
    // 1. Setup
    const user = await User.create({
      fullName: 'Test User 2',
      email: 'test' + Math.random() + '@example.com',
      password: 'password',
    })

    const modelo = await ModeloAeronave.create({ nome: 'MODELO TESTE 2 ' + Math.random() })
    const base = await Base.create({ nome: 'BASE TESTE 2 ' + Math.random() })
    const status = await StatusSlot.create({ nome: 'PENDENTE' })
    const barra = await Barra.create({ 
      nome: 'BARRA TESTE 2 ' + Math.random(), 
      modeloAeronaveId: modelo.id,
      baseId: base.id 
    })

    // 2. Preparar payload de importação para um slot novo
    const importData = {
      slots: [
        {
          data: '14/05/2026',
          hora: '11:00',
          barra: barra.nome,
          st: 'PENDENTE',
          id: 2,
        }
      ]
    }

    // 3. Executar importação
    const response = await client
      .post('/api/v1/slots/import')
      .loginAs(user)
      .json(importData)

    // 4. Verificações
    response.assertStatus(200)
    
    const targetDataHora = DateTime.fromFormat('14/05/2026 11:00', 'dd/MM/yyyy HH:mm', { zone: 'America/Sao_Paulo' })
    const allSlots = await Slot.query().where('barraId', barra.id)
    const newSlot = allSlots.find(s => s.dataHora?.toMillis() === targetDataHora.toMillis())

    assert.exists(newSlot, 'O novo slot deveria ter sido criado')
    assert.equal(newSlot?.isChecked, false, 'O novo slot deveria estar com isChecked = false')
  })

  test('it should delete unrelated slots during import', async ({ client, assert }) => {
    // 1. Setup
    const user = await User.create({
      fullName: 'Test User 3',
      email: 'test' + Math.random() + '@example.com',
      password: 'password',
    })

    const status = await StatusSlot.create({ nome: 'REVISÃO ' + Math.random() })
    
    // Criar um slot que NÃO está no payload de importação
    const unrelatedSlot = await Slot.create({
      dataHora: DateTime.now().plus({ days: 10 }),
      statusSlotId: status.id,
      isChecked: true,
    })

    // 2. Importar algo básico (payload vazio)
    const importData = {
      slots: []
    }

    // 3. Executar importação
    await client
      .post('/api/v1/slots/import')
      .loginAs(user)
      .json(importData)

    // 4. Verificar que o slot não relacionado sumiu
    const found = await Slot.find(unrelatedSlot.id)
    assert.isNull(found, 'O slot não relacionado deveria ter sido deletado')
  })
})
