module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(10),
      },
      title: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(50),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      winnerPointsEarned: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'winner_points_earned',
      },
      thumbnail: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      gameUrl: {
        allowNull: true,
        type: Sequelize.TEXT,
        field: 'game_url',
      },
      viewCount: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'view_count',
      },
      playCount: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'play_count',
      },
      attributes: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('games');
  },
};
