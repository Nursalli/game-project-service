const bcrypt = require('bcryptjs');
const { UniqueConstraintError } = require('sequelize')

const { User, UserRole } = require('../../../db/models');
const { AppError } = require('../../utils/error');

module.exports = {
  register: async ({ email, firstName, lastName, password }) => {
    const encryptedPassword = bcrypt.hashSync(password);

    try {
      const createdUser = await User.create({
        email,
        firstName,
        lastName,
        password: encryptedPassword,
      });
      
      await UserRole.create({
        userId: createdUser.id,
        roleId: 2
      });
  
      return await User.findByPk(createdUser.id, {
        include: ['roles']
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        if (error?.parent?.code === 'ER_DUP_ENTRY') {
          throw new AppError(error.parent.sqlMessage, 400);
        }
      }
      throw error;
    }
  },

  login: async (email, plainPassword) => {
    const userIsExist = await User.findOne({
      where: { email },
      include: ['roles'],
    });

    if (!userIsExist) {
      throw new AppError('Email or Password Invalid', 401);
    }

    const isPasswordCorrect = bcrypt.compareSync(plainPassword, userIsExist.password);

    if (!isPasswordCorrect) {
      throw new AppError('Email or Password Invalid', 401);
    }

    return userIsExist;
  } 
}
