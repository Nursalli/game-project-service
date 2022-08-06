const bcrypt = require('bcryptjs');
const { UniqueConstraintError } = require('sequelize');

const { User, UserRole, GameHistory } = require('../../../db/models');
const { AppError } = require('../../utils/error');

module.exports = {
  register: async ({ email, firstName, lastName, password }) => {
    const encryptedPassword = bcrypt.hashSync(password);

    try {
      const createdUser = await User.create({
        email,
        firstName,
        lastName,
        password: encryptedPassword,
      });

      await UserRole.create({
        userId: createdUser.id,
        roleId: 2,
      });

      return await User.findByPk(createdUser.id, {
        include: ['roles'],
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        if (error?.parent?.code === 'ER_DUP_ENTRY') {
          throw new AppError(error.parent.sqlMessage, 400);
        }
      }
      throw error;
    }
  },

  login: async (email, plainPassword) => {
    const userIsExist = await User.findOne({
      where: { email },
      include: ['roles'],
    });

    if (!userIsExist) {
      throw new AppError('Email or Password Invalid', 401);
    }

    const isPasswordCorrect = bcrypt.compareSync(plainPassword, userIsExist.password);

    if (!isPasswordCorrect) {
      throw new AppError('Email or Password Invalid', 401);
    }

    return userIsExist;
  },

  getMyHistories: async (playerId) => {
    const gameHistories = await GameHistory.findAll({
      where: {
        player_id: playerId,
      },
      order: [['played_at', 'DESC']],
      limit: 30,
      attributes: ['points_earned', 'played_at', 'status'],
      raw: true,
      include: ['game'],
    });

    const myHistories = gameHistories.map(function (gameHistory) {
      const myHistory = {
        gameName: gameHistory['game.title'],
        gameThumbnail: gameHistory['game.thumbnail'],
        pointsEarned: gameHistory.points_earned,
        playedAt: gameHistory.played_at,
        status: gameHistory.status,
      };
      return myHistory;
    });

    return myHistories;
  },
};
