module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        'roles',
        [
          {
            id: 1,
            name: 'Admin',
            description: 'have access to dashboard',
          },
          {
            id: 2,
            name: 'Player',
            description: 'can play the game',
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
        'roles',
        {
          id: {
            [Sequelize.Op.in]: [1, 2],
          },
        },
        {}
      );
    } catch (error) {
      console.error(error);
    }
  },
};
