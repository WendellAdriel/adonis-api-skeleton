'use strict'

const Factory = use('Factory')

class DatabaseSeeder {
  * run () {
    yield Factory.model('App/Domains/Todo/Models/Todo').create(5)
  }
}

module.exports = DatabaseSeeder
