const UserController = require('./controllers/UserController')
const UserControllerPolicy = require('./policies/UserControllerPolicy')
const MovieController = require('./controllers/MovieController')
const MovieControllerPolicy = require('./policies/MovieControllerPolicy')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/user/register',
    UserControllerPolicy.register,
    UserController.register
  )
  app.post('/user/login',
    UserController.login
  )
  app.delete('/users',
    UserController.deleteAll
  )
  app.get('/movies/search',
    MovieControllerPolicy.search,
    isAuthenticated,
    MovieController.search
  )
}