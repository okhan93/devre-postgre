const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const ListingsController = require('./controllers/ListingsController')

module.exports = app => {
  app.post(
    '/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  )
  app.post(
    '/login',
    AuthenticationController.login
  )
  app.get(
    '/songs',
    SongsController.index
  )
  app.post(
    '/songs',
    SongsController.post
  )

  app.get(
    '/listings',
    ListingsController.index
  )
  app.post(
    '/listings',
    ListingsController.filter
  )
}
