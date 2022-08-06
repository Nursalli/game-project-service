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

  getMyBio: async (playerId) => {
    const user = await User.findOne({
      where: {
        id: playerId,
      },
      attributes: ['id', 'email', 'first_name', 'last_name'],
      raw: true,
      include: ['biodata'],
    });

    if (!user) {
      throw new AppError('User Not Found', 404);
    }

    const userBiodata = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      bio: user['biodata.bio'],
      birthday: user['biodata.birthday'].toJSON().split('T')[0],
      country: user['biodata.country'],
    };

    return userBiodata;
  },

  getMyGames: async (playerId) => {
    const gameHistories = await GameHistory.findAll({
      where: {
        player_id: playerId,
      },
      attributes: ['points_earned', 'played_at', 'status'],
      raw: true,
      include: ['game'],
    });

    const uniqGame = [];
    for (let history of gameHistories) {
      const isGamePushed = uniqGame.findIndex((r) => r['game.id'] === history['game.id']);

      if (isGamePushed < 0) {
        uniqGame.push(history);
      } else {
        uniqGame[isGamePushed].points_earned += history.points_earned;
      }
    }

    const myGames = uniqGame.map(function (game) {
      const myGame = {
        gameName: game['game.title'],
        gameThumbnail: game['game.thumbnail'],
        totalPointsEarned: game.points_earned,
        gameUrl: game['game.gameUrl'],
      };
      return myGame;
    });

    myGames.sort((a, b) => b.totalPointsEarned - a.totalPointsEarned);

    return myGames;
  },
};
