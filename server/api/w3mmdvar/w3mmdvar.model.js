'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('w3mmdvar',
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
      pid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      varname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value_int: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      value_real: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      value_string: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
}
