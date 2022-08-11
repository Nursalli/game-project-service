const gamesRouter = require('express').Router();

const { authentication, authorization } = require('../../middlewares/auth');
const { validation } = require('../../middlewares/validation');
const buildRoutes = require('../../utils/buildRoutes');

const gameValidator = require('./validator');
const gameController = require('./controller');

const routes = {
  'GET: /landing': [validation(gameValidator.list), gameController.landing],
  'GET: /listing': [validation(gameValidator.list), gameController.listing],
  'POST: /view-count/:id': [validation(gameValidator.paramsId), gameController.addViewCount],
  'POST: /play-count/:id': [
    authentication,
    authorization(['Player', 'Admin']),
    validation(gameValidator.paramsId),
    gameController.addPlayCount,
  ],
  'GET: /leaderboard/:id': [validation(gameValidator.paramsId), gameController.getLeaderboard],
  'POST: /play/init': [
    authentication,
    authorization(['Player', 'Admin']),
    validation(gameValidator.playInit),
    gameController.playInit,
  ],
  'POST: /play/com': [
    authentication,
    authorization(['Player', 'Admin']),
    validation(gameValidator.playCom),
    gameController.playCom,
  ],
  'GET: /:id': [validation(gameValidator.paramsId), gameController.getDetails],
};

buildRoutes(gamesRouter, routes);

module.exports = gamesRouter;
