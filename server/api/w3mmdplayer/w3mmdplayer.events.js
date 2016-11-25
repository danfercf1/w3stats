/**
 * W3mmdPlayers model events
 */

'use strict';

import {EventEmitter} from 'events';
let W3mmdPlayers = require('../../sqldb').W3mmdPlayers;
let W3mmdPlayersEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
W3mmdPlayersEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  W3mmdPlayers.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    W3mmdPlayersEvents.emit(`${event}:${doc._id}`, doc);
    W3mmdPlayersEvents.emit(event, doc);
    done(null);
  };
}

export default W3mmdPlayersEvents;
