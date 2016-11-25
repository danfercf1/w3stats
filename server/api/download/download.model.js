'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('downloads',
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
      map: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mapsize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      datetime: {
        type: DataTypes.DATE,
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      spoofedrealm: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      downloadtime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
}
