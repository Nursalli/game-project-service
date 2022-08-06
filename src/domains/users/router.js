const usersRouter = require('express').Router();

const { authentication, authorization } = require('../../middlewares/auth');
const { validation } = require('../../middlewares/validation');
const buildRoutes = require('../../utils/buildRoutes');

const userValidator = require('./validator');
const userController = require('./controller');

const routes = {
  'POST: /register': [validation(userValidator.register), userController.register],
  'POST: /login': [validation(userValidator.login), userController.login],
  'GET: /bio/:userId': [
    authentication,
    authorization(['Admin', 'Player']),
    validation(userValidator.getMyBio),
    userController.getMyBio,
  ],
  'GET: /my-histories': [authentication, authorization(['Admin', 'Player']), userController.getMyHistories],
};

buildRoutes(usersRouter, routes);

module.exports = usersRouter;
