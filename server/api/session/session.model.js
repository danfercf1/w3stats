'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('scores',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      server: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
}
