'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('admins',
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      server: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
}
