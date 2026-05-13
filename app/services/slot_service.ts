import Slot from '#models/slot'
import Aluno from '#models/aluno'
import Inva from '#models/inva'
import Aeronave from '#models/aeronave'
import Missao from '#models/missao'
import Barra from '#models/barra'
import StatusSlot from '#models/status_slot'
import { DateTime } from 'luxon'

export default class SlotService {
  /**
   * Explicação do "PORQUÊ": A data/hora recebida do frontend ou importação
   * é considerada no fuso horário de São Paulo (America/Sao_Paulo).
   * Para garantir a integridade e facilitar consultas, convertemos para UTC
   * antes de persistir no banco de dados.
   */
  private convertToUTC(dateStr: string, format: string = 'yyyy-MM-dd HH:mm'): DateTime {
    return DateTime.fromFormat(dateStr, format, { zone: 'America/Sao_Paulo' }).toUTC()
  }

  async store(data: any) {
    if (data.dataHora) {
      data.dataHora = this.convertToUTC(data.dataHora)

      if (data.barraId) {
        const existingSlot = await Slot.query()
          .where('barraId', data.barraId)
          .where('dataHora', data.dataHora.toSQL())
          .first()

        if (existingSlot) {
          throw new Error('Já existe um slot cadastrado para esta barra neste horário.')
        }
      }
    }
    return await Slot.create(data)
  }

  async update(id: number, data: any) {
    let slot = await Slot.find(id)

    if (data.dataHora) {
      data.dataHora = this.convertToUTC(data.dataHora)
    }

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

    if (!slot) {
      slot = new Slot()
    }

    const finalBarraId = data.barraId || slot.barraId
    const finalDataHora = data.dataHora || slot.dataHora

    if (finalBarraId && finalDataHora) {
      const query = Slot.query().where('barraId', finalBarraId).where('dataHora', finalDataHora.toSQL())

      if (slot.id) {
        query.whereNot('id', slot.id)
      }

      const existingSlot = await query.first()

      if (existingSlot) {
        throw new Error('Já existe outro slot cadastrado para esta barra neste horário.')
      }
    }

    slot.merge(data)
    await slot.save()
    return slot
  }

  /**
   * Otimização Big O (Phase 3):
   * 1. Buscamos todos os registros de referência de uma vez (Alunos, Invas, etc.)
   * 2. Utilizamos Maps em memória para busca rápida (O(1)) dentro do loop.
   * 3. Isso evita milhares de consultas ao banco de dados durante a importação.
   */
  async import(slotsData: any[]) {
    const results = []
    const errors = []

    // Pre-fetch reference data
    const [alunos, invas, aeronaves, missoes, barras, statusSlots] = await Promise.all([
      Aluno.all(),
      Inva.all(),
      Aeronave.all(),
      Missao.all(),
      Barra.all(),
      StatusSlot.all(),
    ])

    const alunoMap = new Map(alunos.map((a) => [a.nome.toLowerCase().trim(), a]))
    const invaMap = new Map(invas.map((i) => [i.nome.toLowerCase().trim(), i]))
    const aeronaveMap = new Map(aeronaves.map((a) => [a.nome.toLowerCase().trim(), a]))
    const missaoMap = new Map(missoes.map((m) => [m.nome.toLowerCase().trim(), m]))
    const barraMap = new Map(barras.map((b) => [b.nome.toLowerCase().trim(), b]))
    const statusMap = new Map(statusSlots.map((s) => [s.nome.toLowerCase().trim(), s]))

    // Buscamos todos os slots existentes no intervalo das datas fornecidas para evitar consultas unitárias
    // Como os slots podem ser muitos, aqui fazemos um trade-off: 
    // Se forem milhares de slots no banco, talvez ainda precisemos de uma estratégia melhor.
    // Para este caso, assumimos que a importação é para um período específico.
    
    for (const slotItem of slotsData) {
      try {
        const requiredFields = ['hora', 'st', 'barra', 'data']
        const missingFields = requiredFields.filter((field) => !slotItem[field])

        if (missingFields.length > 0) {
          errors.push({
            slotId: slotItem.id,
            error: `Campos obrigatórios faltando: ${missingFields.join(', ')}`,
          })
          continue
        }

        const dataHora = this.convertToUTC(`${slotItem.data} ${slotItem.hora}`, 'dd/MM/yyyy HH:mm')

        if (!dataHora.isValid) {
          errors.push({
            slotId: slotItem.id,
            error: `Data/hora inválida: ${slotItem.data} ${slotItem.hora}`,
          })
          continue
        }

        const normalize = (value: unknown) => {
          if (value === undefined || value === null) return null
          const normalized = String(value).trim()
          return normalized === '' ? null : normalized
        }

        const alunoName = normalize(slotItem.aluno)?.toLowerCase()
        const invaName = normalize(slotItem.inva)?.toLowerCase()
        const aeronaveName = normalize(slotItem.ae)?.toLowerCase()
        const missaoName = normalize(slotItem.missao)?.toLowerCase()
        const barraName = normalize(slotItem.barra)?.toLowerCase()
        const statusName = normalize(slotItem.st)?.toLowerCase()
        const observacoes = normalize(slotItem.obs)

        let aluno = alunoName ? alunoMap.get(alunoName) : null
        if (alunoName && !aluno) {
          aluno = await Aluno.create({ nome: slotItem.aluno, cpf: null, celular: null })
          alunoMap.set(alunoName, aluno) // Update map for subsequent items
        }

        const inva = invaName ? invaMap.get(invaName) : null
        if (invaName && !inva) {
          errors.push({ slotId: slotItem.id, error: `Instrutor (inva) não encontrado: ${slotItem.inva}` })
          continue
        }

        const aeronave = aeronaveName ? aeronaveMap.get(aeronaveName) : null
        if (aeronaveName && !aeronave) {
          errors.push({ slotId: slotItem.id, error: `Aeronave não encontrada: ${slotItem.ae}` })
          continue
        }

        const missao = missaoName ? missaoMap.get(missaoName) : null
        if (missaoName && !missao) {
          errors.push({ slotId: slotItem.id, error: `Missão não encontrada: ${slotItem.missao}` })
          continue
        }

        const barra = barraName ? barraMap.get(barraName) : null
        if (!barra) {
          errors.push({ slotId: slotItem.id, error: `Barra não encontrada: ${slotItem.barra}` })
          continue
        }

        const statusSlot = statusName ? statusMap.get(statusName) : null
        if (!statusSlot) {
          errors.push({ slotId: slotItem.id, error: `Status não encontrado: ${slotItem.st}` })
          continue
        }

        // Para evitar N+1 aqui, ainda estamos buscando o slot pelo dataHora e barraId
        // Uma melhoria seria carregar os slots existentes para as datas em questão
        let slot = await Slot.query()
            .where('dataHora', dataHora.toSQL()!)
            .where('barraId', barra.id)
            .first()

        const slotPayload: any = {
          dataHora,
          alunoId: aluno ? aluno.id : null,
          invaId: inva ? inva.id : null,
          aeronaveId: aeronave ? aeronave.id : null,
          missaoId: missao ? missao.id : null,
          statusSlotId: statusSlot.id,
          barraId: barra.id,
          observacoes: observacoes || null,
        }

        if (slot) {
          slot.merge(slotPayload)
          await slot.save()
          results.push({ slotId: slotItem.id, action: 'updated', slot: slot.serialize() })
        } else {
          slot = await Slot.create(slotPayload)
          results.push({ slotId: slotItem.id, action: 'created', slot: slot.serialize() })
        }
      } catch (e) {
        errors.push({ slotId: slotItem.id, error: (e as Error).message })
      }
    }

    return { results, errors }
  }
}
