/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  users: {
    index: typeof routes['users.index']
    create: typeof routes['users.create']
    store: typeof routes['users.store']
    show: typeof routes['users.show']
    edit: typeof routes['users.edit']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
  situacaoInvas: {
    index: typeof routes['situacao_invas.index']
    create: typeof routes['situacao_invas.create']
    store: typeof routes['situacao_invas.store']
    show: typeof routes['situacao_invas.show']
    edit: typeof routes['situacao_invas.edit']
    update: typeof routes['situacao_invas.update']
    destroy: typeof routes['situacao_invas.destroy']
  }
  modeloAeronaves: {
    index: typeof routes['modelo_aeronaves.index']
    create: typeof routes['modelo_aeronaves.create']
    store: typeof routes['modelo_aeronaves.store']
    show: typeof routes['modelo_aeronaves.show']
    edit: typeof routes['modelo_aeronaves.edit']
    update: typeof routes['modelo_aeronaves.update']
    destroy: typeof routes['modelo_aeronaves.destroy']
  }
  bases: {
    index: typeof routes['bases.index']
    create: typeof routes['bases.create']
    store: typeof routes['bases.store']
    show: typeof routes['bases.show']
    edit: typeof routes['bases.edit']
    update: typeof routes['bases.update']
    destroy: typeof routes['bases.destroy']
  }
  statusSlots: {
    index: typeof routes['status_slots.index']
    create: typeof routes['status_slots.create']
    store: typeof routes['status_slots.store']
    show: typeof routes['status_slots.show']
    edit: typeof routes['status_slots.edit']
    update: typeof routes['status_slots.update']
    destroy: typeof routes['status_slots.destroy']
  }
  cursos: {
    index: typeof routes['cursos.index']
    create: typeof routes['cursos.create']
    store: typeof routes['cursos.store']
    show: typeof routes['cursos.show']
    edit: typeof routes['cursos.edit']
    update: typeof routes['cursos.update']
    destroy: typeof routes['cursos.destroy']
  }
  aeronaves: {
    index: typeof routes['aeronaves.index']
    create: typeof routes['aeronaves.create']
    store: typeof routes['aeronaves.store']
    show: typeof routes['aeronaves.show']
    edit: typeof routes['aeronaves.edit']
    update: typeof routes['aeronaves.update']
    destroy: typeof routes['aeronaves.destroy']
  }
  missoes: {
    index: typeof routes['missoes.index']
    create: typeof routes['missoes.create']
    store: typeof routes['missoes.store']
    show: typeof routes['missoes.show']
    edit: typeof routes['missoes.edit']
    update: typeof routes['missoes.update']
    destroy: typeof routes['missoes.destroy']
  }
  invas: {
    index: typeof routes['invas.index']
    create: typeof routes['invas.create']
    store: typeof routes['invas.store']
    show: typeof routes['invas.show']
    edit: typeof routes['invas.edit']
    update: typeof routes['invas.update']
    destroy: typeof routes['invas.destroy']
  }
  alunos: {
    index: typeof routes['alunos.index']
    create: typeof routes['alunos.create']
    store: typeof routes['alunos.store']
    show: typeof routes['alunos.show']
    edit: typeof routes['alunos.edit']
    update: typeof routes['alunos.update']
    destroy: typeof routes['alunos.destroy']
  }
  restricoes: {
    import: typeof routes['restricoes.import']
    bulkDestroy: typeof routes['restricoes.bulk_destroy']
    index: typeof routes['restricoes.index']
    create: typeof routes['restricoes.create']
    store: typeof routes['restricoes.store']
    show: typeof routes['restricoes.show']
    edit: typeof routes['restricoes.edit']
    update: typeof routes['restricoes.update']
    destroy: typeof routes['restricoes.destroy']
  }
  tipoDisponibilidades: {
    index: typeof routes['tipo_disponibilidades.index']
    create: typeof routes['tipo_disponibilidades.create']
    store: typeof routes['tipo_disponibilidades.store']
    show: typeof routes['tipo_disponibilidades.show']
    edit: typeof routes['tipo_disponibilidades.edit']
    update: typeof routes['tipo_disponibilidades.update']
    destroy: typeof routes['tipo_disponibilidades.destroy']
  }
  escalaTrabalhos: {
    import: typeof routes['escala_trabalhos.import']
    index: typeof routes['escala_trabalhos.index']
    create: typeof routes['escala_trabalhos.create']
    store: typeof routes['escala_trabalhos.store']
    show: typeof routes['escala_trabalhos.show']
    edit: typeof routes['escala_trabalhos.edit']
    update: typeof routes['escala_trabalhos.update']
    destroy: typeof routes['escala_trabalhos.destroy']
  }
  slots: {
    index: typeof routes['slots.index']
    store: typeof routes['slots.store']
    import: typeof routes['slots.import']
    show: typeof routes['slots.show']
    update: typeof routes['slots.update']
    destroy: typeof routes['slots.destroy']
  }
  barras: {
    index: typeof routes['barras.index']
    create: typeof routes['barras.create']
    store: typeof routes['barras.store']
    show: typeof routes['barras.show']
    edit: typeof routes['barras.edit']
    update: typeof routes['barras.update']
    destroy: typeof routes['barras.destroy']
  }
  barrasHorarios: {
    index: typeof routes['barras_horarios.index']
    create: typeof routes['barras_horarios.create']
    store: typeof routes['barras_horarios.store']
    show: typeof routes['barras_horarios.show']
    edit: typeof routes['barras_horarios.edit']
    update: typeof routes['barras_horarios.update']
    destroy: typeof routes['barras_horarios.destroy']
  }
}
