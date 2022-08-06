'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('game_histories', 'status', {
      allowNull: false,
      type: Sequelize.ENUM('LOSE', 'WIN', 'DRAW'),
    });

    await queryInterface.removeColumn('game_histories', 'is_win');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('game_histories', 'is_win', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.removeColumn('game_histories', 'status');
  },
};
