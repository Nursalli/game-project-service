module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('badges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      startingPoint: {
        allowNull: false,
        type: Sequelize.BIGINT,
        field: 'starting_point',
      },
      endingPoint: {
        allowNull: false,
        type: Sequelize.BIGINT,
        field: 'ending_point',
      },
      thumbnail: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      meta: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('badges');
  },
};
