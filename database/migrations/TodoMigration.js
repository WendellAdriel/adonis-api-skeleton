'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.createIfNotExists('todos', table => {
      table.increments()
      table.string('title', 50)
      table.string('description', 200)
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('todos')
  }
}

module.exports = UsersSchema
