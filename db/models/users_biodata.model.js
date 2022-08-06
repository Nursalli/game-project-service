module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends require('sequelize').Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }

  UserBiodata.init(
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
      bio: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      country: {
        allowNull: true,
        type: DataTypes.STRING(3),
      },
      birthday: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'UserBiodata',
      tableName: 'users_biodata',
      timestamps: false,
    }
  );

  return UserBiodata;
};
