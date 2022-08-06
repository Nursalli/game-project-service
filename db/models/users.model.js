module.exports = (sequelize, DataTypes) => {
  class User extends require('sequelize').Model {
    static associate(models) {
      // roles
      this.belongsToMany(models.Role, {
        through: models.UserRole,
        as: 'roles',
        foreignKey: 'user_id',
        unique: true,
      });

      // gameHistories
      this.belongsToMany(models.Game, {
        through: models.GameHistory,
        as: 'gameHistories',
        foreignKey: 'player_id',
        unique: false,
      });

      // badges
      this.belongsToMany(models.Badge, {
        through: models.UserBadgeHistory,
        as: 'badges',
        foreignKey: 'user_id',
        unique: false,
      });

      // badgesHistories
      this.hasMany(models.UserBadgeHistory, {
        as: 'badgesHistories',
        foreignKey: 'user_id',
      });

      // biodata
      this.hasOne(models.UserBiodata, {
        foreignKey: 'user_id',
        as: 'biodata'
      });
    };
  }

  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50),
      field: 'first_name'
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING(50),
      field: 'last_name'
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50),
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });

  return User;
}
