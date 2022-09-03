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
  'POST: /my-games': [
    authentication,
    authorization(['Admin', 'Player']),
    validation(userValidator.getMyGames),
    userController.getMyGames,
  ],
  'GET: /badges-points/:userId': [
    authentication,
    authorization(['Admin', 'Player']),
    validation(userValidator.getUserBadgeAndPoint),
    userController.getUserBadgeAndPoint,
  ],
  'POST: /edit-profile': [
    authentication,
    authorization(['Admin', 'Player']),
    validation(userValidator.editProfile),
    userController.editProfile,
  ],
  'POST: /update-profile-pic': [
    authentication,
    authorization(['Admin', 'Player']),
    validation(userValidator.updateProfilePic),
    userController.updateProfilePic,
  ],
  'POST: /validate': [authentication, authorization(['Admin', 'Player']), userController.validateUser],
  'GET: /points/:gameId': [
    authentication,
    authorization(['Admin', 'Player']),
    validation(userValidator.getMyPoints),
    userController.getMyPoints,
  ],
  'POST: /reset-password': [validation(userValidator.resetPassword), userController.resetPassword],
};

buildRoutes(usersRouter, routes);

module.exports = usersRouter;
