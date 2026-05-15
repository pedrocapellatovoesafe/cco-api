import EscalaTrabalho from '#models/escala_trabalho'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import TipoDisponibilidade from '#models/tipo_disponibilidade'
import Inva from '#models/inva'

export default class EscalaTrabalhoService {
  /**
   * Importa escalas de trabalho, atualizando registros existentes ou criando novos.
   *
   * DECISÃO ARQUITETURAL:
   * Utilizamos um loop com 'updateOrCreate' dentro de uma transação para garantir
   * a atomicidade da operação. Embora o 'updateOrCreateMany' seja preferível para
   * performance (bulk), ele apresenta limitações de compatibilidade com chaves
   * compostas em SQLite. A normalização da data para ISO string é CRÍTICA aqui
   * para que o Lucid consiga identificar registros existentes no SQLite,
   * resolvendo o bug de duplicação.
   */
  async import(escalasData: any[]) {
    // Cache de tipos e invas para evitar múltiplas queries
    const tiposMap = new Map<string, number>()
    const invasMap = new Map<string, number>()

    const allTipos = await TipoDisponibilidade.all()
    allTipos.forEach((t) => tiposMap.set(t.nome.toLowerCase(), t.id))

    const allInvas = await Inva.all()
    allInvas.forEach((i) => invasMap.set(i.nome.toLowerCase(), i.id))

    const naoEspecificadoId = tiposMap.get('não especificado') || 11

    // Reverse map para buscar nome pelo ID
    const tiposNomeMap = new Map<number, string>()
    allTipos.forEach((t) => tiposNomeMap.set(t.id, t.nome.toLowerCase()))

    /**
     * Helper para definir prioridade de status.
     * Status específicos (ex: Sobreaviso, Férias) têm prioridade sobre status genéricos (Disponível, Folga Regular).
     */
    const getPriority = (id: number) => {
      const nome = tiposNomeMap.get(id)
      if (nome === 'disponivel' || nome === 'folga regular') {
        return 1
      }
      return 2
    }

    return await db.transaction(async (trx) => {
      // 1. Identificar meses únicos na importação
      const months = [
        ...new Set(
          escalasData.map((item) => {
            const dataParsed = item.data.includes('/')
              ? DateTime.fromFormat(item.data, 'dd/MM/yyyy')
              : DateTime.fromISO(item.data)
            return dataParsed.toFormat('yyyy-MM')
          })
        ),
      ]

      // 2. Remover registros atuais do mês correspondente (exceto instrutores 'solo')
      // Esta operação limpa a escala do mês para os instrutores regulares antes de re-popular.
      for (const month of months) {
        await EscalaTrabalho.query({ client: trx })
          .whereHas('inva', (query) => {
            query.whereHas('situacaoInva', (sQuery) => {
              sQuery.whereNot('nome', 'solo')
            })
          })
          .whereRaw("strftime('%Y-%m', data) = ?", [month])
          .delete()
      }

      // 3. Deduplicação Inteligente: Se houver duplicatas no payload para o mesmo dia/periodo/inva,
      // priorizamos o status mais específico (ex: Sobreaviso > Folga Regular).
      const uniqueEscalas = new Map<string, any>()

      for (const item of escalasData) {
        const dataParsed = item.data.includes('/')
          ? DateTime.fromFormat(item.data, 'dd/MM/yyyy')
          : DateTime.fromISO(item.data)

        let finalInvaId = item.invaId
        if (!finalInvaId && item.inva) {
          finalInvaId = invasMap.get(item.inva.toLowerCase())
        }
        if (!finalInvaId) continue

        let finalTipoId = item.tipoDisponibilidadeId
        if (!finalTipoId && item.tipo) {
          finalTipoId = tiposMap.get(item.tipo.toLowerCase()) || naoEspecificadoId
        }
        if (!finalTipoId) finalTipoId = naoEspecificadoId

        const key = `${dataParsed.toISODate()}|${item.periodo.toLowerCase()}|${finalInvaId}`
        const priority = getPriority(finalTipoId)

        const existing = uniqueEscalas.get(key)
        if (existing) {
          const existingPriority = getPriority(existing.finalTipoId)
          // Só sobrescreve se a nova prioridade for MAIOR ou se for IGUAL (mantendo lógica de "último vence")
          if (priority >= existingPriority) {
            uniqueEscalas.set(key, { ...item, finalInvaId, finalTipoId, dataParsed, priority })
          }
        } else {
          uniqueEscalas.set(key, { ...item, finalInvaId, finalTipoId, dataParsed, priority })
        }
      }

      const results = []

      for (const item of uniqueEscalas.values()) {
        const escala = await EscalaTrabalho.updateOrCreate(
          {
            data: item.dataParsed.toISODate() as any,
            periodo: item.periodo.toLowerCase(),
            invaId: item.finalInvaId,
          },
          {
            tipoDisponibilidadeId: item.finalTipoId,
            motivo: item.motivo || '',
          },
          { client: trx }
        )
        results.push(escala)
      }

      return results
    })
  }
}
