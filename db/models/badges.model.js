module.exports = (sequelize, DataTypes) => {
  class Badge extends require('sequelize').Model {}

  Badge.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      startingPoint: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'starting_point',
      },
      endingPoint: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'ending_point',
      },
      thumbnail: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      meta: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Badge',
      tableName: 'badges',
      timestamps: false,
    }
  );

  return Badge;
};
