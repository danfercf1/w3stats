/**
 * Bans model events
 */

'use strict';

import {EventEmitter} from 'events';
let Bans = require('../../sqldb').Bans;
let BansEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BansEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Bans.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    BansEvents.emit(`${event}:${doc._id}`, doc);
    BansEvents.emit(event, doc);
    done(null);
  };
}

export default BansEvents;
