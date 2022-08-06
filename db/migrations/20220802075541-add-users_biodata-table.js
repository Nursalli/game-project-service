module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_biodata', {
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
      bio: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING(3),
      },
      birthday: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_biodata');
  },
};
