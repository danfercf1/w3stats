'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('dotagames',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      botid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gameid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      winner: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sec: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
}
