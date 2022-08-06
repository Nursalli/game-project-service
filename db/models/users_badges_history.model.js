module.exports = (sequelize, DataTypes) => {
  class UserBadgeHistory extends require('sequelize').Model {
    static associate(models) {
      // user
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }

  UserBadgeHistory.init(
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
      badgeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'badges',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'badge_id',
      },
      badgeName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'badge_name',
      },
      pointsBefore: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'points_before',
      },
      pointsAfter: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'points_after',
      },
      earnedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'earned_at',
      },
    },
    {
      sequelize,
      modelName: 'UserBadgeHistory',
      tableName: 'user_badges_history',
      timestamps: false,
    }
  );

  return UserBadgeHistory;
};
