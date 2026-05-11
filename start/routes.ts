/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')
  })
  .prefix('/api/v1')

router
  .group(() => {
    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

  // CRUD Routes
  router.group(() => {
    router.resource('users', controllers.Users)
    router.resource('situacao-invas', controllers.SituacaoInvas)
    router.resource('modelo-aeronaves', controllers.ModeloAeronaves)
    router.resource('bases', controllers.Bases)
    router.resource('status-slots', controllers.StatusSlots)
    router.resource('cursos', controllers.Cursos)
    router.resource('aeronaves', controllers.Aeronaves)
    router.resource('missoes', controllers.Missoes)
    router.resource('invas', controllers.Invas)
    router.resource('alunos', controllers.Alunos)
    router.post('restricoes/import', [controllers.Restricoes, 'import'])
    router.resource('restricoes', controllers.Restricoes)
    router.resource('tipo-disponibilidades', controllers.TipoDisponibilidades)
    
    router.post('escala-trabalhos/import', [controllers.EscalaTrabalhos, 'import'])
    router.resource('escala-trabalhos', controllers.EscalaTrabalhos)
}).prefix('/api/v1').use(middleware.auth())

    // Custom slot import route
    router
    .group(() => {
      router
        .group(() => {
          router.get('', [controllers.Slots, 'index'])
          router.post('', [controllers.Slots, 'store'])
          router.post('import', [controllers.Slots, 'import'])
          router.get(':id', [controllers.Slots, 'show'])
          router.put(':id', [controllers.Slots, 'update'])
          router.delete(':id', [controllers.Slots, 'destroy'])
        })
        .prefix('slots')
        .use(middleware.auth())

    // router.resource('slots', controllers.Slots)
    router.resource('barras', controllers.Barras)
  })
  .prefix('/api/v1')
  .use(middleware.auth())
})
