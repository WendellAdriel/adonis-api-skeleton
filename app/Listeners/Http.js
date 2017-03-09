'use strict'

const Youch = use('youch')
const Http = exports = module.exports = {}

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function * (error, request, response) {
  const status = error.status || 500
  const youch = new Youch(error, request.request)
  const formatMethod = 'toJSON'
  const formattedErrors = yield youch[formatMethod]()
  response.status(status).send(formattedErrors)
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {
}
