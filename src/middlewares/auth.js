const jwt = require('jsonwebtoken');

const { User } = require('../../db/models');
const { AppError } = require('../utils/error');

module.exports = {
  authorization: (requiredRoles) => (req, res, next) => {
    const currentRoles = req.user.roles.map((role) => role.name);

    const isAuthorized = !!currentRoles.filter((role) => requiredRoles.includes(role)).length;

    if (isAuthorized) {
      next();
      return;
    }
    
    throw new AppError('Unauthorized', 401);
  },

  authentication: async (req, res, next) => {
    req.isAuthenticated = () => {
      return req.user !== undefined;
    }

    let token = '';

    try {
      ([_, token] = req.headers['authorization'].split(' '));
    } catch (error) {
      throw new AppError('Token Required', 403);
    }

    if (!token) {
      throw new AppError('Token Required', 403);
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
        ignoreExpiration: false
      });

      const user = await User.findByPk(Number(decoded.sub), {
        include: ['roles'],
      });

      if (!user) {
        throw new AppError('Token Invalid', 403);
      }

      user.password = undefined

      req.user = user;

      next();
    } catch (error) {
      throw new AppError('Token Invalid', 403);
    }
  }
}