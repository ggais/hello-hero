var userController = require('../users/userController.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {
  app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', userController.signup);
  app.get('/api/users/signedin', userController.checkAuth);
  app.get('/api/users', userController.getAllUsers);
  app.get('/api/users/:username', userController.getUser);
  app.put('/api/users/:username', userController.editUser);
  app.delete('/api/users/:username', userController.getAllUsers);
  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

