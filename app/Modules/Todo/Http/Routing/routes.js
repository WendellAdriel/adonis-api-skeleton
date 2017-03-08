'use strict'

const isGroup = true
const groupName = 'todos'
const groupMiddleware = null
const routes = [
  { url: '/', verbs: ['GET'], action: 'index', middleware: null },
  { url: '/', verbs: ['POST'], action: 'store', middleware: null },
  { url: '/:id', verbs: ['GET'], action: 'show', middleware: null },
  { url: '/:id', verbs: ['PUT'], action: 'update', middleware: null },
  { url: '/:id', verbs: ['DELETE'], action: 'destroy', middleware: null },
]

module.exports = { isGroup, groupName, groupMiddleware, routes }
