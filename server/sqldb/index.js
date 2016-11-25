/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

let db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize.options)
};

// Insert models below
db.Admins = db.sequelize.import('../api/admin/admin.model');
db.Bans = db.sequelize.import('../api/ban/ban.model');
db.DotaGames = db.sequelize.import('../api/dgame/dgame.model');
db.DotaPlayers = db.sequelize.import('../api/dplayer/dplayer.model');
db.Downloads = db.sequelize.import('../api/download/download.model');
db.GamePlayers = db.sequelize.import('../api/gplayer/gplayer.model');
db.Games = db.sequelize.import('../api/game/game.model');
db.Scores = db.sequelize.import('../api/score/score.model');
db.Sessions = db.sequelize.import('../api/session/session.model');
db.W3mmdPlayers = db.sequelize.import('../api/w3mmdplayer/w3mmdplayer.model');
db.W3mmdVars = db.sequelize.import('../api/w3mmdvar/w3mmdvar.model');

module.exports = db;
