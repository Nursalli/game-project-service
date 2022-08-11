const { Game, sequelize, GameHistory, UserBadgeHistory, Badge } = require('../../../db/models');
const { AppError } = require('../../utils/error');
const { Op } = require('sequelize');

module.exports = {
  list: async (limit) => {
    const allGames = await Game.findAll({
      order: [
        ['playCount', 'DESC'],
        ['viewCount', 'DESC'],
      ],
      ...(limit && { limit: limit }),
      ...(!limit && {}),
    });
    return allGames;
  },
  addCounter: async (param, id) => {
    const updatedGame = await Game.findOne({ where: { id: id } });

    if (!updatedGame) {
      throw new AppError('Game Not Found', 404);
    }

    updatedGame[param] += 1;
    await updatedGame.save();

    return {
      id: updatedGame.id,
      [param]: updatedGame[param],
    };
  },
  getLeaderboard: async (id) => {
    const validId = await Game.findOne({ where: { id: id } });

    if (!validId) {
      throw new AppError('Game Not Found', 404);
    }

    const result = await sequelize.query(
      `SELECT a.player_id AS id, CONCAT(b.first_name, ' ', b.last_name) AS name, b.email, CASE WHEN c.badge_name IS NOT NULL THEN c.badge_name ELSE 'Bronze' END AS badge, SUM(a.points_earned) AS points FROM game_histories a LEFT JOIN users b ON a.player_id = b.id LEFT JOIN (SELECT user_id, badge_name, RANK() OVER(PARTITION BY user_id ORDER BY earned_at DESC) AS earned_rank FROM user_badges_history) c ON a.player_id = c.user_id WHERE a.game_id = ${id} AND c.earned_rank = 1 GROUP BY 1,2,3,4 ORDER BY 5 DESC`
    );

    return result[0];
  },
  getDetails: async (id) => {
    const game = await Game.findOne({ where: { id: id } });

    if (!game) {
      throw new AppError('Game Not Found', 404);
    }

    return game;
  },
  playInit: async (data) => {
    const game = await Game.findOne({ where: { id: data.gameId } });

    if (!game) {
      throw new AppError('Game Not Found', 404);
    }

    const gameHistory = await GameHistory.create(data);

    return {
      id: gameHistory.id,
    };
  },
  calcTotalPoint: async (id) => {
    const gameHistory = await GameHistory.findOne({ where: { id: id } });

    if (!gameHistory) {
      throw new AppError('Game History Not Found', 404);
    }

    let currentPoint = await GameHistory.sum('points_earned', { where: { playerId: gameHistory.playerId } });

    if (!currentPoint) {
      currentPoint = 0;
    }

    return currentPoint;
  },
  updateHistory: async (data) => {
    const gameHistory = await GameHistory.findOne({ where: { id: data.idHistory } });

    if (!gameHistory.pointsEarned && !gameHistory.metaData && !gameHistory.status) {
      if (data.status === 'WIN') {
        const game = await Game.findOne({ where: { id: data.id } });
        gameHistory.pointsEarned = game.winnerPointsEarned;
      } else {
        gameHistory.pointsEarned = 0;
      }

      gameHistory.metaData = JSON.stringify(data.metaData);
      gameHistory.status = data.status;

      const result = await gameHistory.save();
      return result;
    } else {
      throw new AppError('Cannot Update Written Game History', 404);
    }
  },
  createBadge: async (data) => {
    const qualifiedBadge = await Badge.findOne({
      where: {
        [Op.and]: [
          {
            startingPoint: {
              [Op.lte]: data.latestPoint,
            },
          },
          {
            endingPoint: {
              [Op.gt]: data.latestPoint,
            },
          },
        ],
      },
    });

    const newBadgeData = {
      userId: data.userId,
      badgeId: qualifiedBadge.id,
      badgeName: qualifiedBadge.name,
      pointsBefore: data.currentPoint,
      pointsAfter: data.latestPoint,
      earnedAt: new Date().toISOString(),
    };

    const newBadge = await UserBadgeHistory.create(newBadgeData);
    return newBadge;
  },
};
