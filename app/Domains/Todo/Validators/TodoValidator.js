'use strict'

const Translation = use('Translation')
const domain = 'Todo'

const TITLE_MIN_LENGTH = 6
const TITLE_MAX_LENGTH = 30
const DESCRIPTION_MIN_LENGTH = 20
const DESCRIPTION_MAX_LENGTH = 100

class TodoValidator {
  * hasErrors (model) {
    const messages = []

    if (model.title === undefined || model.title === null) {
      messages.push(Translation.validation(domain, 'title_required'))
    }

    if (model.title.length < TITLE_MIN_LENGTH) {
      messages.push(Translation.validation(domain, 'title_min', [TITLE_MIN_LENGTH]))
    }

    if (model.title.length < TITLE_MAX_LENGTH) {
      messages.push(Translation.validation(domain, 'title_max', [TITLE_MAX_LENGTH]))
    }

    if (model.description === undefined || model.description === null) {
      messages.push(Translation.validation(domain, 'description_required'))
    }

    if (model.description.length < DESCRIPTION_MIN_LENGTH) {
      messages.push(Translation.validation(domain, 'description_min', [DESCRIPTION_MIN_LENGTH]))
    }

    if (model.description.length < DESCRIPTION_MAX_LENGTH) {
      messages.push(Translation.validation(domain, 'description_max', [DESCRIPTION_MAX_LENGTH]))
    }

    return messages
  }
}

module.exports = new TodoValidator();
