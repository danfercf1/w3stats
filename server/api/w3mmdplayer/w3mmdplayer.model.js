'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('w3mmdplayers',
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
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gameid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leaver: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      practicing: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
}
