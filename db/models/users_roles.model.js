module.exports = (sequelize, DataTypes) => {
  class UserRole extends require('sequelize').Model {}

  UserRole.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
      },
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'role_id',
      },
    },
    {
      sequelize,
      modelName: 'UserRole',
      tableName: 'users_roles',
      timestamps: false,
    }
  );

  return UserRole;
};
