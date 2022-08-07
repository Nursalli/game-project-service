const { Game, sequelize } = require('../../../db/models');
const { AppError } = require('../../utils/error');

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
      `SELECT CONCAT(b.first_name, ' ', b.last_name) AS name, b.email, CASE WHEN c.badge_name IS NOT NULL THEN c.badge_name ELSE 'Bronze' END AS badge, SUM(a.points_earned) AS points FROM game_histories a LEFT JOIN users b ON a.player_id = b.id LEFT JOIN user_badges_history c ON a.player_id = c.user_id WHERE a.game_id = ${id} GROUP BY 1,2,3 ORDER BY 4 DESC`
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
};
