const { SuccessResponse } = require('../../utils/response');
const gameRepository = require('./repository');

module.exports = {
  list: async (req, res) => {
    const games = await gameRepository.list();
    const response = new SuccessResponse('Success List Games', games);

    res.json(response);
  },
}