/**
 * Sessions model events
 */

'use strict';

import {EventEmitter} from 'events';
let Sessions = require('../../sqldb').Sessions;
let SessionsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SessionsEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Sessions.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SessionsEvents.emit(`${event}:${doc._id}`, doc);
    SessionsEvents.emit(event, doc);
    done(null);
  };
}

export default SessionsEvents;
