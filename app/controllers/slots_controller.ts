import Slot from '#models/slot'
import Aluno from '#models/aluno'
import Inva from '#models/inva'
import Aeronave from '#models/aeronave'
import Missao from '#models/missao'
import Barra from '#models/barra'
import StatusSlot from '#models/status_slot'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { slotsFilterValidator } from '#validators/slot'

export default class SlotsController {
  async index({ request, response }: HttpContext) {
    const { startDate, endDate } = await request.validateUsing(slotsFilterValidator)

    const startLocal = DateTime.fromFormat(startDate, 'yyyy-MM-dd', { zone: 'America/Sao_Paulo' }).startOf('day')
    const start = startLocal.toUTC()

    const end = endDate
      ? DateTime.fromFormat(endDate, 'yyyy-MM-dd', { zone: 'America/Sao_Paulo' }).endOf('day').toUTC()
      : startLocal.endOf('day').toUTC()

    const slots = await Slot.query()
      .whereBetween('dataHora', [start.toSQL()!, end.toSQL()!])
      .preload('statusSlot')
      .preload('aeronave', (query) => query.preload('modeloAeronave'))
      .preload('aluno')
      .preload('inva', (query) => query.preload('situacaoInva'))
      .preload('missao', (query) => query.preload('curso'))
      .preload('barra', (query) => query.preload('modeloAeronave'))
    return response.json(slots)
  }

  async show({ params, response }: HttpContext) {
    const slot = await Slot.query()
      .where('id', params.id)
      .preload('statusSlot')
      .preload('aeronave', (query) => query.preload('modeloAeronave'))
      .preload('aluno')
      .preload('missao', (query) => query.preload('curso'))
      .preload('barra', (query) => query.preload('modeloAeronave'))
      .firstOrFail()
    return response.json(slot)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['statusSlotId', 'aeronaveId', 'invaId', 'alunoId', 'missaoId', 'barraId', 'dataHora', 'observacoes', 'isChecked'])
    if (data.dataHora) {
      // 1. Recebe a string e avisa que ela está no fuso de SP/Brasília
      // 2. Converte para UTC antes de salvar no banco
      data.dataHora = DateTime.fromFormat(data.dataHora, 'yyyy-MM-dd HH:mm', { zone: 'America/Sao_Paulo' }).toUTC()

      if (data.barraId) {
        const existingSlot = await Slot.query()
          .where('barraId', data.barraId)
          .where('dataHora', data.dataHora.toSQL())
          .first()

        if (existingSlot) {
          return response.status(400).json({
            error: 'Já existe um slot cadastrado para esta barra neste horário.'
          })
        }
      }
    }
    const slot = await Slot.create(data)
    return response.json(slot)
  }

  async update({ params, request, response }: HttpContext) {
    let slot = await Slot.find(params.id)
    const data = request.only(['statusSlotId', 'aeronaveId', 'invaId', 'alunoId', 'missaoId', 'barraId', 'dataHora', 'observacoes', 'isChecked'])

    if (data.dataHora) {
      data.dataHora = DateTime.fromFormat(data.dataHora, 'yyyy-MM-dd HH:mm', { zone: 'America/Sao_Paulo' }).toUTC()
    }

    // Se não encontrou pelo ID, tenta encontrar pela barra e dataHora (únicos)
    if (!slot) {
      const barraId = data.barraId
      const dataHora = data.dataHora
      if (barraId && dataHora) {
        slot = await Slot.query()
          .where('barraId', barraId)
          .where('dataHora', dataHora.toSQL())
          .first()
      }
    }

    // Se ainda não encontrou, cria um novo objeto
    if (!slot) {
      slot = new Slot()
    }

    // Validação de duplicidade na mesma barra e horário
    const finalBarraId = data.barraId || slot.barraId
    const finalDataHora = data.dataHora || slot.dataHora

    if (finalBarraId && finalDataHora) {
      const query = Slot.query().where('barraId', finalBarraId).where('dataHora', finalDataHora.toSQL())

      if (slot.id) {
        query.whereNot('id', slot.id)
      }

      const existingSlot = await query.first()

      if (existingSlot) {
        return response.status(400).json({
          error: 'Já existe outro slot cadastrado para esta barra neste horário.'
        })
      }
    }

    slot.merge(data)
    await slot.save()

    // Recarregar o slot para garantir que as relações estejam atualizadas
    const slotUpdated = await Slot.query()
      .where('id', slot.id)
      .preload('statusSlot')
      .preload('aeronave', (query) => query.preload('modeloAeronave'))
      .preload('aluno')
      .preload('missao', (query) => query.preload('curso'))
      .preload('barra', (query) => query.preload('modeloAeronave'))
      .firstOrFail()
    return response.json(slotUpdated)
  }

  async destroy({ params, response }: HttpContext) {
    const slot = await Slot.findOrFail(params.id)
    await slot.delete()
    return response.json({ message: 'Slot deleted' })
  }

  async import({ request, response }: HttpContext) {
    const body = request.body()
    // Validar estrutura básica
    if (!body.slots || !Array.isArray(body.slots)) {
      return response.status(400).json({
        error: 'Estrutura inválida. Esperado: { slots[] }'
      })
    }

    const results = []
    const errors = []

    for (const slotData of body.slots) {
      try {
        // Validar campos obrigatórios mínimos
        const requiredFields = ['hora', 'st', 'barra', 'data']
        const missingFields = requiredFields.filter(field => !slotData[field])

        if (missingFields.length > 0) {
          errors.push({
            slotId: slotData.id,
            error: `Campos obrigatórios faltando: ${missingFields.join(', ')}`
          })
          continue
        }

        // Combinar data e hora
        const dateStr = slotData.data
        const timeStr = slotData.hora
        const dataHoraStr = `${dateStr} ${timeStr}`

        const dataHora = DateTime.fromFormat(dataHoraStr, 'dd/MM/yyyy HH:mm', {
          zone: 'America/Sao_Paulo'
        })

        if (!dataHora.isValid) {
          errors.push({
            slotId: slotData.id,
            error: `Data/hora inválida: ${dataHoraStr}`
          })
          continue
        }

        const dataHoraUtc = dataHora.toUTC()

        const normalize = (value: unknown) => {
          if (value === undefined || value === null) {
            return null
          }

          const normalized = String(value).trim()
          return normalized === '' ? null : normalized
        }

        const alunoName = normalize(slotData.aluno)
        const invaName = normalize(slotData.inva)
        const aeronaveName = normalize(slotData.ae)
        const missaoName = normalize(slotData.missao)
        const barraName = normalize(slotData.barra)
        const statusName = normalize(slotData.st)
        const observacoes = normalize(slotData.obs)

        let aluno = alunoName ? await Aluno.query().where('nome', alunoName).first() : null
        if (alunoName && !aluno) {
          aluno = await Aluno.create({
            nome: alunoName,
            cpf: null,
            celular: null
          })
        }

        const inva = invaName ? await Inva.query().where('nome', invaName).first() : null
        if (invaName && !inva) {
          errors.push({
            slotId: slotData.id,
            error: `Instrutor (inva) não encontrado: ${invaName}`
          })
          continue
        }

        const aeronave = aeronaveName ? await Aeronave.query().where('nome', aeronaveName).first() : null
        if (aeronaveName && !aeronave) {
          errors.push({
            slotId: slotData.id,
            error: `Aeronave não encontrada: ${aeronaveName}`
          })
          continue
        }

        const missao = missaoName ? await Missao.query().where('nome', missaoName).first() : null
        if (missaoName && !missao) {
          errors.push({
            slotId: slotData.id,
            error: `Missão não encontrada: ${missaoName}`
          })
          continue
        }

        const barra = await Barra.query().where('nome', barraName).first()
        if (!barra) {
          errors.push({
            slotId: slotData.id,
            error: `Barra não encontrada: ${barraName}`
          })
          continue
        }

        const statusSlot = await StatusSlot.query().where('nome', statusName).first()
        if (!statusSlot) {
          errors.push({
            slotId: slotData.id,
            error: `Status não encontrado: ${statusName}`
          })
          continue
        }

        // Procurar por slot existente com a mesma dataHora
        let slot = await Slot.query().where('dataHora', dataHoraUtc.toSQL()).first()

        const slotPayload = {
          dataHora: dataHoraUtc,
          alunoId: aluno ? aluno.id : null,
          invaId: inva ? inva.id : null,
          aeronaveId: aeronave ? aeronave.id : null,
          missaoId: missao ? missao.id : null,
          statusSlotId: statusSlot.id,
          barraId: barra.id,
          observacoes: observacoes || null
        }

        if (slot) {
          // Atualizar slot existente
          slot.merge(slotPayload)
          await slot.save()
          results.push({
            slotId: slotData.id,
            action: 'updated',
            slot: slot.serialize()
          })
          console.log(`Slot atualizado: ${slot.id} para dataHora ${dataHoraUtc.toSQL()}`)
        } else {
          // Criar novo slot
          slot = await Slot.create(slotPayload)
          results.push({
            slotId: slotData.id,
            action: 'created',
            slot: slot.serialize()
          })
          console.log(`Slot criado: ${slot.id} para dataHora ${dataHoraUtc.toSQL()}`)
        }
      } catch (e) {
        errors.push({
          slotId: slotData.id,
          error: (e as Error).message
        })
        console.error(`Erro ao processar slotId ${slotData.id}:`, e)
      }
    }

    return response.json({
      success: errors.length === 0,
      results,
      errors: errors.length > 0 ? errors : undefined
    })
  }
}