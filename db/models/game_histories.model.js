module.exports = (sequelize, DataTypes) => {
  class GameHistory extends require('sequelize').Model {
    static associate(models) {
      // game
      this.belongsTo(models.Game, {
        foreignKey: 'game_id',
        as: 'game',
      });
    }
  }

  GameHistory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      playerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'player_id',
      },
      gameId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'games',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'game_id',
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('LOSE', 'WIN', 'DRAW'),
        field: 'status',
      },
      pointsEarned: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'points_earned',
      },
      metaData: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'meta_data',
      },
      playedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'played_at',
      },
    },
    {
      sequelize,
      modelName: 'GameHistory',
      tableName: 'game_histories',
      timestamps: false,
    }
  );

  return GameHistory;
};
