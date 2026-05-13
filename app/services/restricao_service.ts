import Restricao from '#models/restricao'

export default class RestricaoService {
  /**
   * Otimização Big O (Phase 3):
   * Embora o original usasse createMany, aqui podemos garantir que os dados
   * estão sanitizados e preparados adequadamente em um Service.
   */
  async import(restricoesData: any[]) {
    const payloads = restricoesData.map((item: any) => ({
      invaId: item.invaId,
      nome: item.nome,
      aeronaveId: item.aeronaveId,
      modeloAeronaveId: item.modeloAeronaveId,
      alunoId: item.alunoId,
      missaoId: item.missaoId,
      observacao: item.observacao,
      isInva: item.isInva,
      isAluno: item.isAluno,
      isAlunoInva: item.isAlunoInva,
      isModelo: item.isModelo,
      isAeronave: item.isAeronave,
      isMissao: item.isMissao,
    }))

    return await Restricao.createMany(payloads)
  }
}
