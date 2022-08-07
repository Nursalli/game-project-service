const { Game } = require('../../../db/models');

module.exports = {
  list: async () => {
    const allGames = await Game.findAll();
    return allGames;
  },
  addViewCount: async (id) => {
    const updatedGame = await Game.findOne({ where: id });

    if (!updatedGame) {
      throw new AppError('Game Not Found', 404);
    }

    updatedGame.viewCount += 1;
    await updatedGame.save();

    return {
      id: updatedGame.id,
      viewCount: updatedGame.viewCount,
    };
  },
};
