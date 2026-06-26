import { test } from '@japa/runner'
import User from '#models/user'
import Inva from '#models/inva'
import Barra from '#models/barra'
import SituacaoInva from '#models/situacao_inva'
import ModeloAeronave from '#models/modelo_aeronave'
import Base from '#models/base'
import InvaBarra from '#models/inva_barra'

test.group('InvaBarras CRUD', () => {
  test('it should perform complete CRUD operations on inva-barras', async ({ client, assert }) => {
    // 1. Setup - Create basic records
    const user = await User.create({
      fullName: 'Test User',
      email: 'test' + Math.random() + '@example.com',
      password: 'password',
    })

    const situacao = await SituacaoInva.create({ nome: 'ATIVO ' + Math.random() })
    const base = await Base.create({ nome: 'BASE TESTE ' + Math.random() })
    const modelo = await ModeloAeronave.create({ nome: 'MODELO TESTE ' + Math.random() })

    const inva = await Inva.create({
      nome: 'Instrutor Teste ' + Math.random(),
      celular: '11999999999',
      situacaoInvaId: situacao.id,
      baseId: base.id,
    })

    const barra = await Barra.create({
      nome: 'Barra Teste ' + Math.random(),
      modeloAeronaveId: modelo.id,
      baseId: base.id,
      ativo: true,
    })

    // 2. Create association (POST)
    const storeResponse = await client
      .post('/api/v1/inva-barras')
      .loginAs(user)
      .json({
        invaId: inva.id,
        barraId: barra.id,
      })

    storeResponse.assertStatus(200)
    const storeBody = storeResponse.body() as any
    const createdId = storeBody.id
    assert.exists(createdId)
    assert.equal(storeBody.invaId, inva.id)
    assert.equal(storeBody.barraId, barra.id)

    // 3. Prevent duplicate association (POST - Conflict)
    const duplicateResponse = await client
      .post('/api/v1/inva-barras')
      .loginAs(user)
      .json({
        invaId: inva.id,
        barraId: barra.id,
      })
    duplicateResponse.assertStatus(409)

    // 4. Get list (GET Index)
    const indexResponse = await client.get('/api/v1/inva-barras').loginAs(user)
    indexResponse.assertStatus(200)
    const list = indexResponse.body() as any
    assert.isTrue(Array.isArray(list))
    const item = list.find((x: any) => x.id === createdId)
    assert.exists(item)
    assert.equal(item.inva.nome, inva.nome)
    assert.equal(item.barra.nome, barra.nome)

    // 5. Get single (GET Show)
    const showResponse = await client.get(`/api/v1/inva-barras/${createdId}`).loginAs(user)
    showResponse.assertStatus(200)
    const showBody = showResponse.body() as any
    assert.equal(showBody.id, createdId)

    // 6. Update association (PUT)
    const anotherBarra = await Barra.create({
      nome: 'Barra Teste 2 ' + Math.random(),
      modeloAeronaveId: modelo.id,
      baseId: base.id,
      ativo: true,
    })

    const updateResponse = await client
      .put(`/api/v1/inva-barras/${createdId}`)
      .loginAs(user)
      .json({
        barraId: anotherBarra.id,
      })

    updateResponse.assertStatus(200)
    assert.equal((updateResponse.body() as any).barraId, anotherBarra.id)

    // 7. Delete association (DELETE)
    const deleteResponse = await client.delete(`/api/v1/inva-barras/${createdId}`).loginAs(user)
    deleteResponse.assertStatus(200)

    // Verify deleted
    const verifyDeleted = await InvaBarra.find(createdId)
    assert.isNull(verifyDeleted)
  })
})
