const { SuccessResponse } = require('../../utils/response');
const gameRepository = require('./repository');

module.exports = {
  landing: async (req, res) => {
    const numberOfGames = 6;
    const games = await gameRepository.list(numberOfGames);
    const response = new SuccessResponse('Success List Games Landing', games);

    res.json(response);
  },
  addViewCount: async (req, res) => {
    const game = await gameRepository.addCounter('viewCount', req.params.id);
    const response = new SuccessResponse('Success Update View Count', game);

    res.json(response);
  },
  addPlayCount: async (req, res) => {
    const game = await gameRepository.addCounter('playCount', req.params.id);
    const response = new SuccessResponse('Success Update Play Count', game);

    res.json(response);
  },
  getDetails: async (req, res) => {
    const game = await gameRepository.getDetails(req.params.id);
    const response = new SuccessResponse('Success Get Game Details', game);

    res.json(response);
  },
  getLeaderboard: async (req, res) => {
    const gameLeaderboard = await gameRepository.getLeaderboard(req.params.id);
    const response = new SuccessResponse('Success Get Games Leaderboard', gameLeaderboard);

    res.json(response);
  },
  listing: async (req, res) => {
    const games = await gameRepository.list();
    const response = new SuccessResponse('Success List Games', games);

    res.json(response);
  },
};
