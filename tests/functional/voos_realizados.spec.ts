import { test } from '@japa/runner'
import User from '#models/user'
import VooRealizado from '#models/voo_realizado'

test.group('Voos Realizados CRUD & Sync', (group) => {
  let originalFetch: typeof fetch

  group.each.setup(() => {
    originalFetch = globalThis.fetch
  })

  group.each.teardown(() => {
    globalThis.fetch = originalFetch
  })

  test('it should sync flights from mock Cavok API', async ({ client, assert }) => {
    // Mock fetch
    globalThis.fetch = async (url: any) => {
      assert.isTrue(url.toString().includes('voesafe.cavok.in/api/voos/'))
      return {
        ok: true,
        status: 200,
        json: async () => ({
          status: 200,
          response: [
            {
              'Tipo de voo financeiro': 'VFR',
              'Missao': 'PC/IFRA > Fase 3A - Mockup SIM IFR > LAB 04 - PROCEDIMENTOS E NAVEGAÇÃO',
              'Instrutor': 'DANILO LIRA SILVEIRA',
              'Aeronave': 'PC-SJK',
              'Aluno': 'Abdel Karim Smaili',
              'Tempo total de voo': 120.0,
              'Abastecimento': 0,
              'Data': '2026-06-25Z',
              'Id': 18726,
            },
            {
              'Tipo de voo financeiro': 'VFR',
              'Missao': 'PC/IFRA > Fase 3B-2 - Navegações e Procedimentos IFR > IFR 10 - NAVEGAÇÃO',
              'Instrutor': 'STEPHAN',
              'Aeronave': 'PS-SFP',
              'Aluno': 'Ruan Pablo Silva Marcolino',
              'Tempo total de voo': 181.0,
              'Abastecimento': 0,
              'Data': '2026-06-25Z',
              'Id': 18725,
            },
          ],
          error: null,
        }),
      } as any
    }

    const user = await User.create({
      fullName: 'Test User',
      email: 'test' + Math.random() + '@example.com',
      password: 'password',
    })

    // Call sync route
    const syncResponse = await client.get('/api/v1/voos-realizados/sync?data=2026-06-25').loginAs(user)
    
    syncResponse.assertStatus(200)
    assert.equal(syncResponse.body().syncedCount, 2)

    // Check database
    const flight1 = await VooRealizado.findBy('cavokId', 18726)
    assert.exists(flight1)
    assert.equal(flight1?.aluno, 'Abdel Karim Smaili')
    assert.equal(flight1?.tempoTotalVoo, 120.0)

    const flight2 = await VooRealizado.findBy('cavokId', 18725)
    assert.exists(flight2)
    assert.equal(flight2?.instrutor, 'STEPHAN')

    // Call sync again to verify upsert (should not duplicate, count remains 2)
    const syncResponse2 = await client.get('/api/v1/voos-realizados/sync?data=2026-06-25').loginAs(user)
    syncResponse2.assertStatus(200)
    
    const count = await VooRealizado.query().whereIn('cavokId', [18726, 18725])
    assert.lengthOf(count, 2)
  })

  test('it should perform complete CRUD on voos-realizados manually', async ({ client, assert }) => {
    const user = await User.create({
      fullName: 'Test User 2',
      email: 'test' + Math.random() + '@example.com',
      password: 'password',
    })

    // Create
    const createResponse = await client
      .post('/api/v1/voos-realizados')
      .loginAs(user)
      .json({
        cavokId: 99999,
        tipoVooFinanceiro: 'IFR',
        missao: 'NAV 01',
        instrutor: 'MOCK INSTRUCTOR',
        aeronave: 'PR-TEST',
        aluno: 'MOCK STUDENT',
        tempoTotalVoo: 150.5,
        abastecimento: 100,
        data: '2026-06-26Z',
      })

    createResponse.assertStatus(200)
    const id = createResponse.body().id
    assert.exists(id)

    // Index
    const indexResponse = await client.get('/api/v1/voos-realizados').loginAs(user)
    indexResponse.assertStatus(200)
    const list = indexResponse.body()
    const item = list.find((x: any) => x.id === id)
    assert.exists(item)
    assert.equal(item.missao, 'NAV 01')

    // Show
    const showResponse = await client.get(`/api/v1/voos-realizados/${id}`).loginAs(user)
    showResponse.assertStatus(200)
    assert.equal(showResponse.body().cavokId, 99999)

    // Update
    const updateResponse = await client
      .put(`/api/v1/voos-realizados/${id}`)
      .loginAs(user)
      .json({
        tempoTotalVoo: 160.0,
      })
    updateResponse.assertStatus(200)
    assert.equal(updateResponse.body().tempoTotalVoo, 160.0)

    // Delete
    const deleteResponse = await client.delete(`/api/v1/voos-realizados/${id}`).loginAs(user)
    deleteResponse.assertStatus(200)

    const findDeleted = await VooRealizado.find(id)
    assert.isNull(findDeleted)
  })
})
