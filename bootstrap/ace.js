'use strict'

/*
|--------------------------------------------------------------------------
| Ace Setup
|--------------------------------------------------------------------------
|
| Ace is the command line utility to create and run terminal commands.
| Here we setup the environment and register ace commands.
|
*/

const app = require('./app')
const fold = require('adonis-fold')
const Ace = require('adonis-ace')
const path = require('path')
const packageFile = path.join(__dirname, '../package.json')

module.exports = function () {
  fold.Registrar
    .register(app.providers.concat(app.aceProviders))
    .then(() => {
      /*
      |--------------------------------------------------------------------------
      | Register Aliases
      |--------------------------------------------------------------------------
      |
      | After registering all the providers, we need to setup aliases so that
      | providers can be referenced with short sweet names.
      |
      */
      fold.Ioc.aliases(app.aliases)

      /*
      |--------------------------------------------------------------------------
      | Register Package File
      |--------------------------------------------------------------------------
      |
      | Adonis application package.json file has the reference to the autoload
      | directory. Here we register the package file with the Helpers provider
      | to setup autoloading.
      |
      */
      const Helpers = use('Helpers')
      Helpers.load(packageFile, fold.Ioc)

      /*
      |--------------------------------------------------------------------------
      | Register Events
      |--------------------------------------------------------------------------
      |
      | Here we require the event.js file to register events defined inside
      | events.js file.
      |
      */
      require('../app/Providers/events')

      /*
      |--------------------------------------------------------------------------
      | Load Middleware And Routes
      |--------------------------------------------------------------------------
      |
      | Middleware and Routes are required to oil up your HTTP server. Here we
      | require defined files for same.
      |
      */
      require('../app/Core/Http/kernel')
      require('../app/Providers/routes')

      /*
      |--------------------------------------------------------------------------
      | Register/Invoke Commands
      |--------------------------------------------------------------------------
      |
      | Here we register commands with the Ace kernel and invoke the currently
      | executed command. It's so simple :)
      |
      */
      Ace.register(app.commands)
      Ace.invoke(require(packageFile))
    })
    .catch((error) => console.error(error.stack))
}
