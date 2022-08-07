const { Game } = require('../../../db/models');
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
  getDetails: async (id) => {
    const game = await Game.findOne({ where: { id: id } });

    if (!game) {
      throw new AppError('Game Not Found', 404);
    }

    return game;
  },
};
