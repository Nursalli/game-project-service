const { SuccessResponse } = require('../../utils/response');
const gameRepository = require('./repository');

module.exports = {
  list: async (req, res) => {
    const games = await gameRepository.list();
    const response = new SuccessResponse('Success List Games', games);

    res.json(response);
  },
  addViewCount: async (req, res) => {
    const game = await gameRepository.addViewCount(Number(req.params.id));
    const response = new SuccessResponse('Success Update View Count', game);

    res.json(response);
  },
  addPlayCount: async (req, res) => {
    const game = await gameRepository.addPlayCount(Number(req.params.id));
    const response = new SuccessResponse('Success Update Play Count', game);

    res.json(response);
  },
};
