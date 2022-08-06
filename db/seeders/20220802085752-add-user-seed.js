const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        'users',
        [
          {
            id: 1,
            first_name: 'Super',
            last_name: 'Admin',
            email: 'admin@binar.platinum.ac.id',
            password: bcrypt.hashSync(process.env.INITIAL_ADMIN_PASSWORD, Number(process.env.BCRYPT_SALT)),
          },
        ],
        {}
      );

      await queryInterface.bulkInsert(
        'users_biodata',
        [
          {
            id: 1,
            user_id: 1,
            bio: 'Saya Super Admin',
            country: 'INA',
            birthday: new Date('12-12-1990'),
          },
        ],
        {}
      );

      await queryInterface.bulkInsert(
        'users_roles',
        [
          {
            id: 1,
            user_id: 1,
            role_id: 1,
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
        'users',
        {
          id: 1,
        },
        {}
      );

      await queryInterface.bulkDelete(
        'users_roles',
        {
          id: 1,
        },
        {}
      );
    } catch (error) {
      console.error(error);
    }
  },
};
