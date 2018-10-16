const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ListingsController = require('./controllers/ListingsController')
const UserActivityController = require('./controllers/UserActivityController')

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
    '/listings',
    ListingsController.index
  )
  app.post(
    '/listings',
    ListingsController.filter
  )

  app.get(
    '/useractivity',
    UserActivityController.index
  )
  app.post(
    '/useractivity',
    UserActivityController.addActivity
  )
}
