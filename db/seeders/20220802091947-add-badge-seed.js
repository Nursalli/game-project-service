module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        'badges',
        [
          {
            id: 1,
            name: 'Bronze',
            starting_point: 0,
            ending_point: 100,
            meta: '{}',
          },
          {
            id: 2,
            name: 'Gold',
            starting_point: 100,
            ending_point: 500,
            meta: '{}',
          },
          {
            id: 3,
            name: 'Platinum',
            starting_point: 500,
            ending_point: 99999999999,
            meta: '{}',
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
        'badges',
        {
          id: {
            [Sequelize.Op.in]: [1, 2, 3],
          },
        },
        {}
      );
    } catch (error) {
      console.error(error);
    }
  },
};
