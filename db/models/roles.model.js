module.exports = (sequelize, DataTypes) => {
  class Role extends require('sequelize').Model {
    static associate(models) {
      // users
      this.belongsToMany(models.User, {
        through: models.UserRole,
        as: 'users',
        foreignKey: 'role_id',
        unique: true,
      });
    }
  }

  Role.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      timestamps: false,
    }
  );

  return Role;
};
