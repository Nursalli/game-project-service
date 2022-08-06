module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(50),
        field: 'first_name'
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING(50),
        field: 'last_name'
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(50),
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
