const gamesRouter = require('express').Router();

const { authentication, authorization } = require('../../middlewares/auth');
const { validation } = require('../../middlewares/validation');
const buildRoutes = require('../../utils/buildRoutes');

const gameValidator = require('./validator');
const gameController = require('./controller');

const routes = {
  'GET: /': [authentication, authorization(['Player', 'Admin']), validation(gameValidator.list), gameController.list],
  'POST: /view-count/:id': [validation(gameValidator.paramsId), gameController.addViewCount],
  'POST: /play-count/:id': [
    authentication,
    authorization(['Player', 'Admin']),
    validation(gameValidator.paramsId),
    gameController.addPlayCount,
  ],
  'GET: /:id': [validation(gameValidator.paramsId), gameController.getDetails],
  'GET: /leaderboard/:id': [validation(gameValidator.paramsId), gameController.getLeaderboard],
};

buildRoutes(gamesRouter, routes);

module.exports = gamesRouter;
