'use strict'

const BaseController = use('BaseController')
const Todo = use('App/Domains/Todo/Models/Todo')
const Repository = use('App/Domains/Todo/Repositories/TodoRepository')
const Validator = use ('App/Domains/Todo/Validators/TodoValidator')
const Service = use('App/Modules/Todo/Services/TodoService')

class TodoController extends BaseController {
  * index (request, response) {
    let todoList = yield Todo.all()
    this.success(response, todoList)
  }

  * store (request, response) {
    let newTodo = new Todo()
    newTodo.title = request.input('title')
    newTodo.description = request.input('description')
    yield newTodo.save()
    this.success(response, newTodo, 201, ['Todo created successfully'])
  }

  * show (request, response) {
    let todoId = request.param('id')
    let todo = yield Todo.find(todoId)

    if (todo) {
      this.success(response, todo)
      return
    }

    this.error(response, ['Resource not found'], 404)
  }

  * update (request, response) {
    let todoId = request.param('id')
    let todo = yield Todo.find(todoId)

    if (todo) {
      todo.title = request.input('title')
      todo.description = request.input('description')
      yield todo.save()
      this.success(response, todo, 200, ['Todo update successfully'])
      return
    }

    this.error(response, ['Resource not found'], 404)
  }

  * destroy (request, response) {
    let todoId = request.param('id')
    let todo = yield Todo.find(todoId)

    if (todo) {
      yield todo.delete()
      this.success(response, null, 200, ['Todo deleted successfully'])
      return
    }

    this.error(response, ['Resource not found'], 404)
  }
}

module.exports = TodoController
