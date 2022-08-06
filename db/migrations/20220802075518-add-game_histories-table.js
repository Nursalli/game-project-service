module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      playerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'player_id',
      },
      gameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'games',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'game_id',
      },
      isWin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'is_win',
      },
      pointsEarned: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'points_earned',
      },
      metaData: {
        allowNull: true,
        type: Sequelize.TEXT,
        field: 'meta_data',
      },
      playedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'played_at',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('game_histories');
  },
};
