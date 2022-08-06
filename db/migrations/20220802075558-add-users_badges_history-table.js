module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_badges_history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
      },
      badgeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'badges',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'badge_id',
      },
      badgeName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'badge_name',
      },
      pointsBefore: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'points_before',
      },
      pointsAfter: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'points_after',
      },
      earnedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'earned_at',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_badges_history');
  },
};
