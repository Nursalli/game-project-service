const { Game } = require('../../../db/models');

module.exports = {
  list: async () => {
    const allGames = await Game.findAll();
    return allGames;
  }
}
