/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/admins', require('./api/admin'));
  app.use('/api/bans', require('./api/ban'));
  app.use('/api/dotagames', require('./api/dgame'));
  app.use('/api/downloads', require('./api/download'));
  app.use('/api/dotaplayers', require('./api/dplayer'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/gameplayers', require('./api/gplayer'));
  app.use('/api/scores', require('./api/score'));
  app.use('/api/sessions', require('./api/session'));
  app.use('/api/w3mmdplayers', require('./api/w3mmdplayer'));
  app.use('/api/w3mmdvar', require('./api/w3mmdvar'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
