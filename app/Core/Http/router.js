'use strict'

const Helpers = use('Helpers')
const Ioc = require('adonis-fold').Ioc
const Route = use('Route')

class Router {
  registerModules (modules) {
    let moduleRoutes
    modules.forEach(module => {
      moduleRoutes = use(Helpers.makeNameSpace('Modules/Todo/Http/Routing', 'routes'))

      if (moduleRoutes.isGroup) {
        this.registerGroupRoutes(moduleRoutes, module)
        return
      }

      moduleRoutes.routes.forEach(route => registerRoute(route, module))
    })
  }

  registerGroupRoutes (moduleRoutes, module) {
    let routesGroup = Route.group(moduleRoutes.groupName, function () {
      moduleRoutes.routes.forEach(route => registerRoute(route, module))
    }).prefix(moduleRoutes.groupName)

    if (moduleRoutes.groupMiddleware) {
      routesGroup.middleware(moduleRoutes.groupMiddleware)
    }
  }
}

function registerRoute (route, module) {
  let newRoute = Route.route(route.url, route.verbs, function * (request, response) {
    let controllerName = `${Helpers.appNameSpace()}/Modules/${module}/Http/Controllers/${module}Controller`
    let controllerInstance = Ioc.makeFunc(`${controllerName}.${route.action}`)
    yield controllerInstance.instance[controllerInstance.method](request, response)
  })

  if (route.middleware) {
    newRoute.middleware(route.middleware)
  }
}

module.exports = new Router()
