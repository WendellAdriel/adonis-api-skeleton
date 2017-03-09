'use strict'

const Config = use('Config')

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Authenticator
  |--------------------------------------------------------------------------
  |
  | Authenticator is a combination of HTTP Authentication scheme and the
  | serializer to be used for retrieving users. Below is the default
  | authenticator to be used for every request.
  |
  | Available Schemes - basic, session, jwt, api
  | Available Serializers - Lucid, Database
  |
  */
  authenticator: 'jwt',

  jwt: {
    serializer: 'Lucid',
    model: 'App/Model/User',
    scheme: 'jwt',
    uid: 'email',
    password: 'password',
    secret: Config.get('app.appKey')
  }
}
