'use strict'

const BaseController = use('BaseController')
const Translation = use('Translation')
const Todo = use('App/Domains/Todo/Models/Todo')
// const Repository = use('App/Domains/Todo/Repositories/TodoRepository')
const Validator = use('App/Domains/Todo/Validators/TodoValidator')
// const Service = use('App/Modules/Todo/Services/TodoService')

const moduleName = 'Todo'

class TodoController extends BaseController {
  * index (request, response) {
    const todoList = yield Todo.all()
    this.success(response, todoList)
  }

  * store (request, response) {
    const newTodo = new Todo()
    newTodo.title = request.input('title')
    newTodo.description = request.input('description')

    const createErrors = yield Validator.hasErrors(newTodo)
    if (createErrors.length > 0) {
      this.error(response, createErrors, 422)
      return
    }

    yield newTodo.save()
    this.success(response, newTodo, 201, [Translation.message(moduleName, 'create.success')])
  }

  * show (request, response) {
    const todoId = request.param('id')
    const todo = yield Todo.find(todoId)

    if (!todo) {
      this.error(response, [Translation.message(moduleName, 'not_found')], 404)
      return
    }

    this.success(response, todo)
  }

  * update (request, response) {
    const updateId = request.param('id')
    const updateTodo = yield Todo.find(updateId)

    const updateErrors = yield Validator.hasErrors(updateTodo)
    if (updateErrors.length > 0) {
      this.error(response, updateErrors, 404)
    }

    updateTodo.title = request.input('title')
    updateTodo.description = request.input('description')

    if (!Validator.isValid(updateTodo)) {
      this.error(response, [Translation.message(moduleName, 'validation_error'), 422])
      return
    }

    yield updateTodo.save()
    this.success(response, updateTodo, 200, [Translation.message(moduleName, 'update.success')])
  }

  * destroy (request, response) {
    const deleteId = request.param('id')
    const deleteTodo = yield Todo.find(deleteId)

    if (!deleteTodo) {
      this.error(response, [Translation.message(moduleName, 'not_found')], 404)
      return
    }

    yield deleteTodo.delete()
    this.success(response, null, 200, [Translation.message(moduleName, 'delete.success')])
  }
}

module.exports = TodoController
