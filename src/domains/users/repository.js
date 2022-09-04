const bcrypt = require('bcryptjs');
const { UniqueConstraintError } = require('sequelize');

const { User, UserRole, GameHistory, UserBadgeHistory, Badge, UserBiodata, sequelize } = require('../../../db/models');

const { AppError } = require('../../utils/error');

const jwt = require('jsonwebtoken');

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

      await UserBiodata.create({
        userId: createdUser.id,
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
      raw: true,
      include: ['biodata'],
    });

    if (!user) {
      throw new AppError('User Not Found', 404);
    }

    const userBiodata = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      bio: user['biodata.bio'],
      birthday: user['biodata.birthday'] && user['biodata.birthday'].toJSON().split('T')[0],
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

  getUserBadgeAndPoint: async (playerId) => {
    const totalPointsEarned = await GameHistory.sum('points_earned', { where: { player_id: playerId } });

    const badge = await Badge.findOne({ where: { starting_point: 0 }, raw: true });
    const initiateBadge = badge.name;

    const userBadgeHistory = await UserBadgeHistory.findAll({
      limit: 1,
      where: {
        userId: playerId,
      },
      attributes: ['badge_name'],
      order: [['earned_at', 'DESC']],
      raw: true,
    });
    const badgeName = userBadgeHistory.length > 0 ? userBadgeHistory[0].badge_name : initiateBadge;

    const user = await User.findOne({
      where: { id: playerId },
      raw: true,
    });

    if (!user) {
      throw new AppError('User Not Found', 404);
    }

    return {
      userId: user.id,
      userEmail: user.email,
      userFirstName: user.firstName,
      badge: badgeName,
      points: totalPointsEarned ? totalPointsEarned : 0,
      userProfilePic: user.profilePic,
    };
  },

  editProfile: async (body, playerId) => {
    const dataUser = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    };

    const dataBio = {
      bio: body.bio,
      country: body.country.toUpperCase(),
      birthday: body.birthday,
    };

    try {
      await User.update(dataUser, {
        where: {
          id: playerId,
        },
      });

      await UserBiodata.update(dataBio, {
        where: {
          user_id: playerId,
        },
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        if (error?.parent?.code === 'ER_DUP_ENTRY') {
          throw new AppError(error.parent.sqlMessage, 400);
        }
      }

      throw error;
    }

    return { ...dataUser, ...dataBio };
  },

  updateProfilePic: async (body, playerId) => {
    const proPic = body.profilePic;

    if (proPic) {
      await User.update(
        {
          profilePic: proPic,
        },
        {
          where: {
            id: playerId,
          },
        }
      );

      return {
        profilePic: proPic,
      };
    }

    const oldProPic = await User.findOne({
      where: {
        id: playerId,
      },
    });

    return {
      profilePic: oldProPic.profilePic,
    };
  },

  validateUser: async (jwtToken) => {
    const tokenArray = jwtToken.split(' ');

    const bearerToken = tokenArray[1];

    try {
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
      const id = decoded.sub;

      const user = await User.findOne({
        where: {
          id: id,
        },
        raw: true,
        include: ['biodata'],
      });

      if (!user) {
        throw new AppError('user invalid, please re-login', 404);
      }

      const userDetail = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profile_pic: user.profilePic,
        country: user['biodata.country'],
      };

      return userDetail;
    } catch (err) {
      throw new AppError('user invalid, please re-login', 400);
    }
  },

  getMyPoints: async (playerId, gameId) => {
    const gameHistories = await GameHistory.findAll({
      where: {
        player_id: playerId,
        game_id: gameId,
      },
      attributes: ['game_id', [sequelize.fn('sum', sequelize.col('points_earned')), 'total_points_earned']],
      raw: true,
      include: ['game'],
      group: ['GameHistory.game_id', 'game.id'],
    });

    if (gameHistories.length === 0) {
      throw new AppError('Game Points Not Found', 404);
    }

    const gamePoints = {
      gameName: gameHistories[0]['game.title'],
      gameThumbnail: gameHistories[0]['game.thumbnail'],
      gameUrl: gameHistories[0]['game.gameUrl'],
      totalPointsEarned: Number(gameHistories[0].total_points_earned),
    };

    return gamePoints;
  },

  resetPassword: async (body) => {
    const email = body.email;
    const password = body.password;
    const encryptedPassword = bcrypt.hashSync(password);

    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
        raw: true,
      });

      if (!user) {
        throw new AppError('Reset password failed', 404);
      }

      await User.update(
        {
          password: encryptedPassword,
        },
        {
          where: {
            email: email,
          },
        }
      );

      return { email: email };
    } catch (err) {
      throw new AppError('Reset password failed', 404);
    }
  },

  getHistories: async (playerId) => {
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
