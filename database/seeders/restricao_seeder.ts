import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Inva from '#models/inva'
import Missao from '#models/missao'
import Restricao from '#models/restricao'
import db from '@adonisjs/lucid/services/db'

export default class RestricaoSeeder extends BaseSeeder {
  /**
   * GROUND_INSTRUCTOR_ALLOWLIST: Missões autorizadas para instrutores 'solo'.
   */
  private GROUND_INSTRUCTOR_ALLOWLIST = [
    'MOCKUP 01',
    'MOCKUP 02',
    'MOCKUP 03',
    'MOCKUP 04 - PCATD',
    'MONITORIA NAV VFR',
    'NAV SOLO',
  ].map((m) => m.toUpperCase())

  /**
   * STANDARD_RESTRICTED_MISSIONS: Missões de cheque que são restritas para todos,
   * exceto para quem tem situação 'checador'.
   */
  private STANDARD_RESTRICTED_MISSIONS = [
    'CHEQUE ANAC - PP',
    'CHEQUE ANAC - PC',
    'CHEQUE ANAC - INVA',
    'LAB 01 - MANOBRAS BÁSICAS',
    'LAB 02 - MANOBRAS BÁSICAS',
    'LAB 03 - MANOBRAS BÁSICAS',
    'LAB 04 - PROCEDIMENTOS E NAVEGAÇÃO',
    'LAB 05 - PROCEDIMENTOS E NAVEGAÇÃO',
    'LAB 06 - PROCEDIMENTOS E NAVEGAÇÃO',
    'SIM 01 - MANOBRAS BÁSICAS',
    'SIM 02 - MANOBRAS BÁSICAS',
    'SIM 03 - USO DE RÁDIO-NAVEGAÇÃO',
    'SIM 04 - USO DE RÁDIO-NAVEGAÇÃO',
    'SIM 05 - USO DE RÁDIO-NAVEGAÇÃO',
    'SIM 06 - USO DE RÁDIO-NAVEGAÇÃO',
    'SIM 07 - PROCEDIMENTOS',
    'SIM 08 - PROCEDIMENTOS',
    'SIM 09 - PROCEDIMENTOS',
    'SIM 10 - PROCEDIMENTOS',
    'SIM 11 - CONTINGÊNCIAS IFR',
    'SIM 12 - NAVEGAÇÃO',
    'SIM 13 - NAVEGAÇÃO',
    'SIM 14 - NAVEGAÇÃO',
    'SIM - AVALIAÇÃO INTERMEDIÁRIA',
    'IFR 01 - MANOBRAS BÁSICAS',
    'IFR 02 - MANOBRAS BÁSICAS',
    'IFR 03 - MANOBRAS BÁSICAS',
    'IFR 04 - NAVEGAÇÃO E PROCEDIMENTOS',
    'IFR 05 - NAVEGAÇÃO E PROCEDIMENTOS',
    'IFR 06 - NAVEGAÇÃO E PROCEDIMENTOS',
    'IFR 07 - NAVEGAÇÃO E PROCEDIMENTOS',
    'IFR 08 - NAVEGAÇÃO E PROCEDIMENTOS',
    'IFR 09 - NAVEGAÇÃO E PROCEDIMENTOS',
    'IFR 10 - NAVEGAÇÃO',
  ].map((m) => m.toUpperCase())

  /**
   * EVENTUAL_RULES: Regras de allowlist por categoria de curso para instrutores 'eventual'.
   */
  private EVENTUAL_RULES = {
    PPA: {
      keywords: ['PPA', 'PRIVADO'],
      authorizedMissions: [
        'PS01',
        'PS02',
        'PS03',
        'PS07',
        'PS08',
        'PS13',
        'AP01',
        'AP02',
        'AP03',
        'AP05',
        'NOT01',
        'NAV01',
        'NAV03',
        'NAV04',
        'NAV05',
      ].map((m) => m.toUpperCase()),
    },
    PCA: {
      keywords: ['PCA', 'COMERCIAL', 'PC', 'GFRA'],
      authorizedMissions: [
        'AD 01',
        'AP 01',
        'NAV 01',
        'NAV 02',
        'NAV 03',
        'NAV 04',
        'NAV 05',
        'NAV 06',
        'NOT 01',
      ].map((m) => m.toUpperCase()),
      excludedMissions: ['AD 02', 'AD 03', 'NAV X1', 'NAV X2'].map((m) => m.toUpperCase()),
    },
    INVA_CFI: {
      keywords: ['INVA', 'INSTRUTOR DE VOO', 'CFI', 'FORMAÇÃO DE INSTRUTOR'],
      authorizedMissions: [],
    },
    APERFEICOAMENTO: {
      keywords: ['APERFEIÇOAMENTO', 'CONTÍNUO'],
      isAllAuthorized: true,
      evaluationKeywords: ['AVAL', 'CHEQUE', 'EXAME', 'TESTE'].map((m) => m.toUpperCase()),
    },
    ADMIN: {
      keywords: ['ADMIN', 'ADMINISTRATIVOS', 'VOO INCENTIVO'],
      authorizedMissions: ['VOO INCENTIVO'].map((m) => m.toUpperCase()),
    },
    ANAC: {
      keywords: ['PPA - PRATICO', 'PC/IFRA', 'INVA'],
      authorizedMissions: ['CHEQUE ANAC'].map((m) => m.toUpperCase()),
    },
  }

  /**
   * Categoriza um curso baseado em seu nome e keywords.
   */
  private getCourseCategory(cursoNome: string): string | null {
    const nome = cursoNome.toUpperCase()

    // ANAC tem prioridade para cursos práticos específicos
    if (nome.includes('PPA - PRATICO') || nome.includes('PC/IFRA')) return 'ANAC'

    // INVA_CFI para cursos de formação de instrutores
    if (
      nome.includes('FORMAÇÃO DE INSTRUTOR') ||
      nome.includes('INSTRUTOR DE VOO') ||
      nome.includes('CFI')
    )
      return 'INVA_CFI'

    // PPA/PCA
    if (nome.includes('PPA') || nome.includes('PRIVADO')) return 'PPA'
    if (
      nome.includes('PCA') ||
      nome.includes('COMERCIAL') ||
      nome.includes('PC') ||
      nome.includes('GFRA')
    )
      return 'PCA'

    // Aperfeiçoamento
    if (nome.includes('APERFEIÇOAMENTO') || nome.includes('CONTÍNUO')) return 'APERFEICOAMENTO'

    // Admin
    if (nome.includes('ADMIN') || nome.includes('VOO INCENTIVO')) return 'ADMIN'

    // Fallback para INVA
    if (nome.includes('INVA')) return 'INVA_CFI'

    return null
  }

  /**
   * Verifica se uma missão é autorizada para o instrutor eventual baseada na categoria do curso.
   */
  private isAuthorizedForEventual(missionNome: string, category: string): boolean {
    const nome = missionNome.toUpperCase()
    const rules = (this.EVENTUAL_RULES as any)[category]
    if (!rules) return true

    if (rules.isAllAuthorized) {
      if (
        rules.evaluationKeywords &&
        rules.evaluationKeywords.some((k: string) => nome.includes(k))
      ) {
        return false
      }
      return true
    }

    if (rules.authorizedMissions) {
      const isAllowed = rules.authorizedMissions.some(
        (m: string) => nome === m || nome.startsWith(m + ' ') || nome.includes(m)
      )
      if (!isAllowed) return false

      if (
        rules.excludedMissions &&
        rules.excludedMissions.some(
          (m: string) => nome === m || nome.startsWith(m + ' ') || nome.includes(m)
        )
      ) {
        return false
      }

      return true
    }

    return false
  }

  // Aguardar uma melhor implementação do RestricaoSeeder para evitar retrabalho de inserção no frontend
  /*
  async run() {
    const invas = await Inva.query().preload('situacaoInva')
    const missoes = await Missao.query().preload('curso')

    await db.transaction(async (trx) => {
      for (const inva of invas) {
        const situacao = inva.situacaoInva?.nome || 'clt_full'

        for (const missao of missoes) {
          let shouldRestrict = false
          const missaoNome = missao.nome.toUpperCase()
          const cursoNome = missao.curso?.nome || ''
          const category = this.getCourseCategory(cursoNome)

          // 1. Regra para Checador (Exclusiva)
          if (situacao === 'checador') {
            if (!missaoNome.includes('CHEQUE ANAC')) {
              shouldRestrict = true
            }
          } else {
            // 2. Regra Geral (STANDARD) para todos exceto checadores
            if (
              this.STANDARD_RESTRICTED_MISSIONS.some(
                (m) => missaoNome === m || missaoNome.startsWith(m)
              )
            ) {
              shouldRestrict = true
            }

            // 3. Regra para Solo
            if (!shouldRestrict && situacao === 'solo') {
              if (
                !this.GROUND_INSTRUCTOR_ALLOWLIST.some(
                  (m) => missaoNome === m || missaoNome.startsWith(m)
                )
              ) {
                shouldRestrict = true
              }
            }

            // 4. Regras Complexas para Eventual
            if (!shouldRestrict && situacao === 'eventual') {
              if (category) {
                if (!this.isAuthorizedForEventual(missaoNome, category)) {
                  shouldRestrict = true
                }
              } else {
                // Se não cair em nenhuma categoria, restringimos por precaução (Inversão de Allowlist)
                shouldRestrict = true
              }
            }
          }

          if (shouldRestrict) {
            await Restricao.updateOrCreate(
              {
                invaId: inva.id,
                missaoId: missao.id,
              },
              {
                invaId: inva.id,
                missaoId: missao.id,
                nome: `[Preset Padrão] ${inva.nome} - Restrição ${missao.nome}`,
                isInva: true,
                isMissao: true,
                observacao: 'Restrição automática baseada no nível de contrato (Preset)',
              },
              { client: trx }
            )
          }
        }
      }
    })
  }
  */
}
