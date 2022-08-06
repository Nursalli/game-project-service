const { Game } = require('../../../db/models');

module.exports = {
  list: async () => {
    const allGames = await Game.findAll();
    return allGames;
  },
  addViewCount: async (id) => {
    const updatedGame = await Game.findOne({ where: id });
    updatedGame.viewCount += 1;
    updatedGame.save();

    return {
      id: updatedGame.id,
      viewCount: updatedGame.viewCount,
    };
  },
};
