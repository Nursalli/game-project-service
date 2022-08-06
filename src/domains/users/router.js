const usersRouter = require('express').Router();

const { authentication, authorization } = require('../../middlewares/auth');
const { validation } = require('../../middlewares/validation');
const buildRoutes = require('../../utils/buildRoutes');

const userValidator = require('./validator');
const userController = require('./controller');

const routes = {
  'POST: /register': [
    validation(userValidator.register),
    userController.register,
  ],
  'POST: /login': [
    validation(userValidator.login),
    userController.login,
  ],
  'GET: /protected': [
    authentication,
    (req, res) => {
      res.json({
        hello: 'world: protected',
        user: req.user
      })
    }
  ],
  'GET: /double-protected': [
    authentication,
    authorization(['Admin']),
    (req, res) => {
      res.json({
        hello: 'world: double-protected',
        user: req.user
      })
    }
  ]
}

buildRoutes(usersRouter, routes);

module.exports = usersRouter;
