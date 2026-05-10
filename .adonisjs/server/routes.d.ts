import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.index': { paramsTuple?: []; params?: {} }
    'situacao_invas.create': { paramsTuple?: []; params?: {} }
    'situacao_invas.store': { paramsTuple?: []; params?: {} }
    'situacao_invas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.index': { paramsTuple?: []; params?: {} }
    'modelo_aeronaves.create': { paramsTuple?: []; params?: {} }
    'modelo_aeronaves.store': { paramsTuple?: []; params?: {} }
    'modelo_aeronaves.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.index': { paramsTuple?: []; params?: {} }
    'bases.create': { paramsTuple?: []; params?: {} }
    'bases.store': { paramsTuple?: []; params?: {} }
    'bases.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.index': { paramsTuple?: []; params?: {} }
    'status_slots.create': { paramsTuple?: []; params?: {} }
    'status_slots.store': { paramsTuple?: []; params?: {} }
    'status_slots.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.index': { paramsTuple?: []; params?: {} }
    'cursos.create': { paramsTuple?: []; params?: {} }
    'cursos.store': { paramsTuple?: []; params?: {} }
    'cursos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.index': { paramsTuple?: []; params?: {} }
    'aeronaves.create': { paramsTuple?: []; params?: {} }
    'aeronaves.store': { paramsTuple?: []; params?: {} }
    'aeronaves.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.index': { paramsTuple?: []; params?: {} }
    'missoes.create': { paramsTuple?: []; params?: {} }
    'missoes.store': { paramsTuple?: []; params?: {} }
    'missoes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.index': { paramsTuple?: []; params?: {} }
    'invas.create': { paramsTuple?: []; params?: {} }
    'invas.store': { paramsTuple?: []; params?: {} }
    'invas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.index': { paramsTuple?: []; params?: {} }
    'alunos.create': { paramsTuple?: []; params?: {} }
    'alunos.store': { paramsTuple?: []; params?: {} }
    'alunos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.index': { paramsTuple?: []; params?: {} }
    'restricoes.create': { paramsTuple?: []; params?: {} }
    'restricoes.store': { paramsTuple?: []; params?: {} }
    'restricoes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'slots.index': { paramsTuple?: []; params?: {} }
    'slots.store': { paramsTuple?: []; params?: {} }
    'slots.import': { paramsTuple?: []; params?: {} }
    'slots.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'slots.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'slots.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.index': { paramsTuple?: []; params?: {} }
    'barras.create': { paramsTuple?: []; params?: {} }
    'barras.store': { paramsTuple?: []; params?: {} }
    'barras.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.index': { paramsTuple?: []; params?: {} }
    'situacao_invas.create': { paramsTuple?: []; params?: {} }
    'situacao_invas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.index': { paramsTuple?: []; params?: {} }
    'modelo_aeronaves.create': { paramsTuple?: []; params?: {} }
    'modelo_aeronaves.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.index': { paramsTuple?: []; params?: {} }
    'bases.create': { paramsTuple?: []; params?: {} }
    'bases.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.index': { paramsTuple?: []; params?: {} }
    'status_slots.create': { paramsTuple?: []; params?: {} }
    'status_slots.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.index': { paramsTuple?: []; params?: {} }
    'cursos.create': { paramsTuple?: []; params?: {} }
    'cursos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.index': { paramsTuple?: []; params?: {} }
    'aeronaves.create': { paramsTuple?: []; params?: {} }
    'aeronaves.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.index': { paramsTuple?: []; params?: {} }
    'missoes.create': { paramsTuple?: []; params?: {} }
    'missoes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.index': { paramsTuple?: []; params?: {} }
    'invas.create': { paramsTuple?: []; params?: {} }
    'invas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.index': { paramsTuple?: []; params?: {} }
    'alunos.create': { paramsTuple?: []; params?: {} }
    'alunos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.index': { paramsTuple?: []; params?: {} }
    'restricoes.create': { paramsTuple?: []; params?: {} }
    'restricoes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'slots.index': { paramsTuple?: []; params?: {} }
    'slots.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.index': { paramsTuple?: []; params?: {} }
    'barras.create': { paramsTuple?: []; params?: {} }
    'barras.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.index': { paramsTuple?: []; params?: {} }
    'situacao_invas.create': { paramsTuple?: []; params?: {} }
    'situacao_invas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.index': { paramsTuple?: []; params?: {} }
    'modelo_aeronaves.create': { paramsTuple?: []; params?: {} }
    'modelo_aeronaves.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.index': { paramsTuple?: []; params?: {} }
    'bases.create': { paramsTuple?: []; params?: {} }
    'bases.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.index': { paramsTuple?: []; params?: {} }
    'status_slots.create': { paramsTuple?: []; params?: {} }
    'status_slots.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.index': { paramsTuple?: []; params?: {} }
    'cursos.create': { paramsTuple?: []; params?: {} }
    'cursos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.index': { paramsTuple?: []; params?: {} }
    'aeronaves.create': { paramsTuple?: []; params?: {} }
    'aeronaves.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.index': { paramsTuple?: []; params?: {} }
    'missoes.create': { paramsTuple?: []; params?: {} }
    'missoes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.index': { paramsTuple?: []; params?: {} }
    'invas.create': { paramsTuple?: []; params?: {} }
    'invas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.index': { paramsTuple?: []; params?: {} }
    'alunos.create': { paramsTuple?: []; params?: {} }
    'alunos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.index': { paramsTuple?: []; params?: {} }
    'restricoes.create': { paramsTuple?: []; params?: {} }
    'restricoes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'slots.index': { paramsTuple?: []; params?: {} }
    'slots.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.index': { paramsTuple?: []; params?: {} }
    'barras.create': { paramsTuple?: []; params?: {} }
    'barras.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'situacao_invas.store': { paramsTuple?: []; params?: {} }
    'modelo_aeronaves.store': { paramsTuple?: []; params?: {} }
    'bases.store': { paramsTuple?: []; params?: {} }
    'status_slots.store': { paramsTuple?: []; params?: {} }
    'cursos.store': { paramsTuple?: []; params?: {} }
    'aeronaves.store': { paramsTuple?: []; params?: {} }
    'missoes.store': { paramsTuple?: []; params?: {} }
    'invas.store': { paramsTuple?: []; params?: {} }
    'alunos.store': { paramsTuple?: []; params?: {} }
    'restricoes.store': { paramsTuple?: []; params?: {} }
    'slots.store': { paramsTuple?: []; params?: {} }
    'slots.import': { paramsTuple?: []; params?: {} }
    'barras.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'slots.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'situacao_invas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'modelo_aeronaves.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bases.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'status_slots.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aeronaves.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'missoes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alunos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restricoes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'slots.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'barras.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}