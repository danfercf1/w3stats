'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection options
  sequelize: {
    database: 'ghost',
    username: 'root',
    password: 'mysql',
    options: {
      logging: false
    }
  },

  // Seed database on startup
  seedDB: false

};
