const { SuccessResponse } = require('../../utils/response');
const gameRepository = require('./repository');

module.exports = {
  landing: async (req, res) => {
    const numberOfGames = 3;
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

  playInit: async (req, res) => {
    const playerId = req.user.id;
    const gameId = req.body.id;
    const playedAt = req.body.playedAt;

    const data = {
      playerId,
      gameId,
      playedAt,
    };

    const result = await gameRepository.playInit(data);

    const response = new SuccessResponse('Success Initiate Game History', result);

    res.json(response);
  },
  playCom: async (req, res) => {
    const currentPoint = await gameRepository.calcTotalPoint(req.body.idHistory);
    const updateHistory = await gameRepository.updateHistory(req.body);
    const latestPoint = await gameRepository.calcTotalPoint(req.body.idHistory);

    const badgeData = {
      userId: updateHistory.playerId,
      currentPoint,
      latestPoint,
    };

    const newBadge = await gameRepository.createBadge(badgeData);

    const response = new SuccessResponse('Success Finalize Game History', { updateHistory, newBadge });

    res.json(response);
  },
  getIsPlayed: async (req, res) => {
    const gameId = req.params.id;
    const playerId = req.user.id;
    const isPlayed = await gameRepository.getIsPlayed(gameId, playerId);

    const response = new SuccessResponse('Success Game is Played by User', { isPlayed: isPlayed });

    res.json(response);
  },
  getRequiredRound: async (req, res) => {
    const gameId = req.params.id;

    const result = await gameRepository.getRequiredRound(gameId);

    const response = new SuccessResponse('Success Get Required Round', result);

    res.json(response);
  },
};
