'use strict'

const config = require('../../../config/app')

class Translation {
  message (module, key, params = [], lang = null) {
    if (!lang) {
      lang = config.locales.locale
    }

    const messages = use(`App/Modules/${module}/Resources/Languages/${lang}/messages`)
    return getTranslation(messages, key, lang, params)
  }

  validation (domain, key, params = [], lang = null) {
    if (!lang) {
      lang = config.locales.locale
    }

    const messages = use(`App/Domains/${domain}/Resources/Languages/${lang}/messages`)
    return getTranslation(messages, key, lang, params)
  }
}

function getTranslation (messages, key, lang, params) {
  let translation = messages[key]
  if (translation) {
    return buildTranslation(translation, params)
  }

  lang = config.locales.fallbackLocale
  translation = messages[key]
  if (translation) {
    return buildTranslation(translation, params)
  }

  return ''
}

function buildTranslation (message, params) {
  let newMessage = message

  params.forEach((param, index, array) => {
    newMessage = message.replace(`p${index + 1}`, param)
  })

  return newMessage
}

module.exports = new Translation()
