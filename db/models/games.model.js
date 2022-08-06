module.exports = (sequelize, DataTypes) => {
  class Game extends require('sequelize').Model {
    static associate(models) {
      // users
      this.belongsToMany(models.User, {
        through: models.GameHistory,
        as: 'players',
        foreignKey: 'game_id',
        unique: false,
      });
    }
  }

  Game.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      code: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(10),
      },
      title: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(50),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      winnerPointsEarned: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'winner_points_earned',
      },
      thumbnail: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      gameUrl: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'game_url',
      },
      viewCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'view_count',
      },
      playCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'play_count',
      },
      attributes: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Game',
      tableName: 'games',
      timestamps: false,
    }
  );

  return Game;
};
