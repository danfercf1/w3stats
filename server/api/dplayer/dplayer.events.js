/**
 * DotaPlayers model events
 */

'use strict';

import {EventEmitter} from 'events';
let DotaPlayers = require('../../sqldb').DotaPlayers;
let DotaPlayersEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DotaPlayersEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  DotaPlayers.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DotaPlayersEvents.emit(`${event}:${doc._id}`, doc);
    DotaPlayersEvents.emit(event, doc);
    done(null);
  };
}

export default DotaPlayersEvents;
