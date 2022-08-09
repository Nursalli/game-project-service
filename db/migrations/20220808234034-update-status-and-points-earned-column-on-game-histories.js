'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('alter table game_histories alter column status drop not null');
    await queryInterface.sequelize.query('alter table game_histories alter column points_earned drop not null');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('alter table game_histories alter column status set not null');
    await queryInterface.sequelize.query('alter table game_histories alter column points_earned set not null');
  },
};
