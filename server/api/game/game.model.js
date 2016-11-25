'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('games',
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
      server: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      map: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gamename: {
        type: DataTypes.STRING(31),
        allowNull: false,
      },
      ownergame: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gamestate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      creatorname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      creatorserver: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
}
