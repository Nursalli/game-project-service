module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        'games',
        [
          {
            id: 1,
            code: 'RPS1',
            title: 'Rock-Paper-Scissors Random',
            description: 'Play Rock-Paper-Scissors with Computer (Organic Random)',
            winner_points_earned: 5,
            game_url: 'https://google.com',
            attributes: '{}',
          },
        ],
        {}
      );
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete(
        'games',
        {
          id: 1,
        },
        {}
      );
    } catch (error) {
      console.error(error);
    }
  },
};
