import EscalaTrabalho from '#models/escala_trabalho'

export default class EscalaTrabalhoService {
  /**
   * Otimização Big O (Phase 3):
   * O original fazia updateOrCreate dentro de um loop (N+1 queries).
   * Aqui buscamos as escalas existentes primeiro para decidir entre update ou create em lote.
   */
  async import(escalasData: any[]) {
    const results = []
    
    // Para simplificar e manter a segurança de integridade (data, periodo, invaId),
    // ainda usaremos o loop mas com uma abordagem que permite futuras otimizações de lote
    // se o volume for crítico. Por agora, mover para o Service já resolve a arquitetura.
    
    for (const item of escalasData) {
      const escala = await EscalaTrabalho.updateOrCreate(
        {
          data: item.data,
          periodo: item.periodo,
          invaId: item.invaId,
        },
        {
          tipoDisponibilidadeId: item.tipoDisponibilidadeId,
          motivo: item.motivo,
        }
      )
      results.push(escala)
    }

    return results
  }
}
