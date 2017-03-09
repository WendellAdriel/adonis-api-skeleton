'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/
const Helpers = use('Helpers')
const Router = use(Helpers.makeNameSpace('Core/Http', 'router'))

const modules = [
  'Todo'
]

Router.registerModules(modules)
