import EscalaTrabalho from '#models/escala_trabalho'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

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
    return await db.transaction(async (trx) => {
      const results = []

      for (const item of escalasData) {
        // Normalização da data: Aceita tanto ISO (yyyy-MM-dd) quanto formato brasileiro (dd/MM/yyyy)
        // Convertemos para ISO string explicitamente pois o driver do SQLite exige strings/numbers
        // para bindings de busca em colunas de data.
        const dataParsed = item.data.includes('/')
          ? DateTime.fromFormat(item.data, 'dd/MM/yyyy')
          : DateTime.fromISO(item.data)

        const escala = await EscalaTrabalho.updateOrCreate(
          {
            data: dataParsed.toISODate() as any,
            periodo: item.periodo,
            invaId: item.invaId,
          },
          {
            tipoDisponibilidadeId: item.tipoDisponibilidadeId,
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
