/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
    }
  }
  'users.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['create']>>>
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/api/v1/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>>
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
    }
  }
  'users.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['edit']>>>
    }
  }
  'users.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>>
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['destroy']>>>
    }
  }
  'situacao_invas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/situacao-invas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['index']>>>
    }
  }
  'situacao_invas.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/situacao-invas/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['create']>>>
    }
  }
  'situacao_invas.store': {
    methods: ["POST"]
    pattern: '/api/v1/situacao-invas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['store']>>>
    }
  }
  'situacao_invas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/situacao-invas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['show']>>>
    }
  }
  'situacao_invas.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/situacao-invas/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['edit']>>>
    }
  }
  'situacao_invas.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/situacao-invas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['update']>>>
    }
  }
  'situacao_invas.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/situacao-invas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/situacao_invas_controller').default['destroy']>>>
    }
  }
  'modelo_aeronaves.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/modelo-aeronaves'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['index']>>>
    }
  }
  'modelo_aeronaves.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/modelo-aeronaves/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['create']>>>
    }
  }
  'modelo_aeronaves.store': {
    methods: ["POST"]
    pattern: '/api/v1/modelo-aeronaves'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['store']>>>
    }
  }
  'modelo_aeronaves.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/modelo-aeronaves/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['show']>>>
    }
  }
  'modelo_aeronaves.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/modelo-aeronaves/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['edit']>>>
    }
  }
  'modelo_aeronaves.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/modelo-aeronaves/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['update']>>>
    }
  }
  'modelo_aeronaves.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/modelo-aeronaves/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/modelo_aeronaves_controller').default['destroy']>>>
    }
  }
  'bases.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/bases'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['index']>>>
    }
  }
  'bases.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/bases/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['create']>>>
    }
  }
  'bases.store': {
    methods: ["POST"]
    pattern: '/api/v1/bases'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['store']>>>
    }
  }
  'bases.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/bases/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['show']>>>
    }
  }
  'bases.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/bases/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['edit']>>>
    }
  }
  'bases.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/bases/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['update']>>>
    }
  }
  'bases.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/bases/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bases_controller').default['destroy']>>>
    }
  }
  'status_slots.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/status-slots'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['index']>>>
    }
  }
  'status_slots.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/status-slots/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['create']>>>
    }
  }
  'status_slots.store': {
    methods: ["POST"]
    pattern: '/api/v1/status-slots'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['store']>>>
    }
  }
  'status_slots.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/status-slots/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['show']>>>
    }
  }
  'status_slots.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/status-slots/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['edit']>>>
    }
  }
  'status_slots.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/status-slots/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['update']>>>
    }
  }
  'status_slots.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/status-slots/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/status_slots_controller').default['destroy']>>>
    }
  }
  'cursos.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/cursos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['index']>>>
    }
  }
  'cursos.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/cursos/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['create']>>>
    }
  }
  'cursos.store': {
    methods: ["POST"]
    pattern: '/api/v1/cursos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['store']>>>
    }
  }
  'cursos.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/cursos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['show']>>>
    }
  }
  'cursos.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/cursos/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['edit']>>>
    }
  }
  'cursos.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/cursos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['update']>>>
    }
  }
  'cursos.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/cursos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['destroy']>>>
    }
  }
  'aeronaves.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/aeronaves'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['index']>>>
    }
  }
  'aeronaves.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/aeronaves/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['create']>>>
    }
  }
  'aeronaves.store': {
    methods: ["POST"]
    pattern: '/api/v1/aeronaves'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['store']>>>
    }
  }
  'aeronaves.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/aeronaves/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['show']>>>
    }
  }
  'aeronaves.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/aeronaves/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['edit']>>>
    }
  }
  'aeronaves.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/aeronaves/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['update']>>>
    }
  }
  'aeronaves.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/aeronaves/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aeronaves_controller').default['destroy']>>>
    }
  }
  'missoes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/missoes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['index']>>>
    }
  }
  'missoes.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/missoes/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['create']>>>
    }
  }
  'missoes.store': {
    methods: ["POST"]
    pattern: '/api/v1/missoes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['store']>>>
    }
  }
  'missoes.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/missoes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['show']>>>
    }
  }
  'missoes.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/missoes/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['edit']>>>
    }
  }
  'missoes.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/missoes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['update']>>>
    }
  }
  'missoes.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/missoes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/missoes_controller').default['destroy']>>>
    }
  }
  'invas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/invas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['index']>>>
    }
  }
  'invas.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/invas/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['create']>>>
    }
  }
  'invas.store': {
    methods: ["POST"]
    pattern: '/api/v1/invas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['store']>>>
    }
  }
  'invas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/invas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['show']>>>
    }
  }
  'invas.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/invas/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['edit']>>>
    }
  }
  'invas.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/invas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['update']>>>
    }
  }
  'invas.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/invas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/invas_controller').default['destroy']>>>
    }
  }
  'alunos.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/alunos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['index']>>>
    }
  }
  'alunos.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/alunos/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['create']>>>
    }
  }
  'alunos.store': {
    methods: ["POST"]
    pattern: '/api/v1/alunos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['store']>>>
    }
  }
  'alunos.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/alunos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['show']>>>
    }
  }
  'alunos.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/alunos/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['edit']>>>
    }
  }
  'alunos.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/alunos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['update']>>>
    }
  }
  'alunos.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/alunos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alunos_controller').default['destroy']>>>
    }
  }
  'restricoes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/restricoes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['index']>>>
    }
  }
  'restricoes.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/restricoes/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['create']>>>
    }
  }
  'restricoes.store': {
    methods: ["POST"]
    pattern: '/api/v1/restricoes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['store']>>>
    }
  }
  'restricoes.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/restricoes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['show']>>>
    }
  }
  'restricoes.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/restricoes/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['edit']>>>
    }
  }
  'restricoes.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/restricoes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['update']>>>
    }
  }
  'restricoes.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/restricoes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/restricoes_controller').default['destroy']>>>
    }
  }
  'slots.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/slots'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/slots_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/slots_controller').default['index']>>>
    }
  }
  'slots.store': {
    methods: ["POST"]
    pattern: '/api/v1/slots'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/slots_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/slots_controller').default['store']>>>
    }
  }
  'slots.import': {
    methods: ["POST"]
    pattern: '/api/v1/slots/import'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/slots_controller').default['import']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/slots_controller').default['import']>>>
    }
  }
  'barras.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/barras'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['index']>>>
    }
  }
  'barras.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/barras/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['create']>>>
    }
  }
  'barras.store': {
    methods: ["POST"]
    pattern: '/api/v1/barras'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['store']>>>
    }
  }
  'barras.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/barras/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['show']>>>
    }
  }
  'barras.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/barras/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['edit']>>>
    }
  }
  'barras.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/barras/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['update']>>>
    }
  }
  'barras.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/barras/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/barras_controller').default['destroy']>>>
    }
  }
}
