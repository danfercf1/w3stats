/**
 * Games model events
 */

'use strict';

import {EventEmitter} from 'events';
let Games = require('../../sqldb').Games;
let GamesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GamesEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Games.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    GamesEvents.emit(`${event}:${doc._id}`, doc);
    GamesEvents.emit(event, doc);
    done(null);
  };
}

export default GamesEvents;
