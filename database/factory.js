'use strict'

const Factory = use('Factory')

Factory.blueprint('App/Domains/Todo/Models/Todo', fake => {
  return {
    title: fake.word(),
    description: fake.sentence()
  }
})
