'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('gameplayers',
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spoofed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reserved: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loadingtime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      left: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      leftreason: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      team: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coloour: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spoofedrealm: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
}
