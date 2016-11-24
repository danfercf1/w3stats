'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('bans',
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isIP: true
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gamename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
}
