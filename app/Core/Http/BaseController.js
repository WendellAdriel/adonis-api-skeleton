'use strict'

class BaseController {
  success (response, data, status = 200, messages = []) {
    response
      .status(status)
      .json({
        success: true,
        status,
        messages,
        data
      })
  }

  error (response, messages = [], status = 500, data = null) {
    response
      .status(status)
      .json({
        success: false,
        status,
        messages,
        data
      })
  }
}

module.exports = BaseController
