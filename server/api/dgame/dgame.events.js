/**
 * DotaGames model events
 */

'use strict';

import {EventEmitter} from 'events';
let DotaGames = require('../../sqldb').DotaGames;
let DotaGamesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DotaGamesEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  DotaGames.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DotaGamesEvents.emit(`${event}:${doc._id}`, doc);
    DotaGamesEvents.emit(event, doc);
    done(null);
  };
}

export default DotaGamesEvents;
