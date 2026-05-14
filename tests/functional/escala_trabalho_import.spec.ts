import { test } from '@japa/runner'
import User from '#models/user'
import Inva from '#models/inva'
import SituacaoInva from '#models/situacao_inva'
import TipoDisponibilidade from '#models/tipo_disponibilidade'
import EscalaTrabalho from '#models/escala_trabalho'
import { DateTime } from 'luxon'

test.group('Escala Trabalho Import', (group) => {
  group.each.setup(async () => {
    await EscalaTrabalho.query().delete()
    await Inva.query().delete()
    await SituacaoInva.query().delete()
    await TipoDisponibilidade.query().delete()
    await User.query().delete()
  })

  test('it should update existing escala instead of creating a new one', async ({
    client,
    assert,
  }) => {
    // 1. Setup
    const user = await User.create({
      fullName: 'Test User',
      email: 'test_escala' + Math.random() + '@example.com',
      password: 'password',
    })

    const situacao = await SituacaoInva.create({ nome: 'ATIVO' })

    const inva = await Inva.create({
      nome: 'INVA TESTE',
      celular: '123456789',
      situacaoInvaId: situacao.id,
    })

    const tipoDisp = await TipoDisponibilidade.create({ nome: 'DISPONIVEL' })

    const dataStrISO = '2026-05-14'
    const dataStrBR = '14/05/2026'
    const data = DateTime.fromFormat(dataStrISO, 'yyyy-MM-dd')

    // 2. Criar uma escala existente
    await EscalaTrabalho.create({
      data: data,
      periodo: 'm',
      invaId: inva.id,
      tipoDisponibilidadeId: tipoDisp.id,
      motivo: 'Original Motivo',
    })

    // 3. Preparar payload de importação com formato brasileiro
    const importData = {
      escalas: [
        {
          data: dataStrBR,
          periodo: 'm',
          invaId: inva.id,
          tipoDisponibilidadeId: tipoDisp.id,
          motivo: 'Updated Motivo',
        },
      ],
    }

    // 4. Executar importação
    const response = await client
      .post('/api/v1/escala-trabalhos/import')
      .loginAs(user)
      .json(importData)

    // 5. Verificações
    response.assertStatus(200)

    const allEscalas = await EscalaTrabalho.all()
    assert.equal(
      allEscalas.length,
      1,
      'Deveria existir apenas uma escala no total, mas foram encontradas ' + allEscalas.length
    )

    const escalas = await EscalaTrabalho.query()
      .where('data', dataStrISO)
      .where('periodo', 'm')
      .where('invaId', inva.id)

    assert.equal(
      escalas.length,
      1,
      'Deveria existir uma escala com data ISO, mas foram encontradas ' + escalas.length
    )
    assert.equal(escalas[0].motivo, 'Updated Motivo', 'O motivo deveria ter sido atualizado')
  })

  test('it should handle both BR and ISO formats in the same import and update existing records', async ({
    client,
    assert,
  }) => {
    const user = await User.create({
      fullName: 'Test User 2',
      email: 'test_escala_2' + Math.random() + '@example.com',
      password: 'password',
    })

    const situacao = await SituacaoInva.create({ nome: 'ATIVO 2' })
    const inva = await Inva.create({ nome: 'INVA 2', celular: '123', situacaoInvaId: situacao.id })
    const tipoDisp = await TipoDisponibilidade.create({ nome: 'DISPONIVEL 2' })

    // Criar escala existente via ISO
    await EscalaTrabalho.create({
      data: DateTime.fromISO('2026-06-01'),
      periodo: 't',
      invaId: inva.id,
      tipoDisponibilidadeId: tipoDisp.id,
      motivo: 'ISO Original',
    })

    const importData = {
      escalas: [
        {
          data: '01/06/2026', // BR format for existing ISO record
          periodo: 't',
          invaId: inva.id,
          tipoDisponibilidadeId: tipoDisp.id,
          motivo: 'Updated from BR',
        },
        {
          data: '2026-06-02', // ISO format for new record
          periodo: 'm',
          invaId: inva.id,
          tipoDisponibilidadeId: tipoDisp.id,
          motivo: 'New from ISO',
        },
      ],
    }

    const response = await client
      .post('/api/v1/escala-trabalhos/import')
      .loginAs(user)
      .json(importData)

    response.assertStatus(200)

    const escala1 = await EscalaTrabalho.query()
      .where('data', '2026-06-01')
      .where('periodo', 't')
      .first()

    assert.exists(escala1)
    assert.equal(escala1?.motivo, 'Updated from BR')

    const escala2 = await EscalaTrabalho.query()
      .where('data', '2026-06-02')
      .where('periodo', 'm')
      .first()

    assert.exists(escala2)
    assert.equal(escala2?.motivo, 'New from ISO')

    const total = await EscalaTrabalho.query().where('invaId', inva.id)
    assert.equal(total.length, 2)
  })
})
