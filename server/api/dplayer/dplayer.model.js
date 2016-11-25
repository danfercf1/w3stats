'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('dotaplayers',
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
      colour: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kills: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deaths: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      creepkills: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      creepdenies: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assists: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gold: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      neutralkills: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      item1: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      item2: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      item3: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      item4: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      item5: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      item6: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      hero: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      newcolour: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      towerkills: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      raxkills: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      courierkills: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false
    }
  );
}
