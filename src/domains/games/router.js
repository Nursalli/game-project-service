const gamesRouter = require('express').Router();

const { authentication, authorization } = require('../../middlewares/auth');
const { validation } = require('../../middlewares/validation');
const buildRoutes = require('../../utils/buildRoutes');

const gameValidator = require('./validator');
const gameController = require('./controller');

const routes = {
  'GET: /': [authentication, authorization(['Player', 'Admin']), validation(gameValidator.list), gameController.list],
  'POST: /view-count/:id': [gameController.addViewCount],
};

buildRoutes(gamesRouter, routes);

module.exports = gamesRouter;
