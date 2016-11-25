/**
 * W3mmdVars model events
 */

'use strict';

import {EventEmitter} from 'events';
let W3mmdVars = require('../../sqldb').W3mmdVars;
let W3mmdVarsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
W3mmdVarsEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  W3mmdVars.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    W3mmdVarsEvents.emit(`${event}:${doc._id}`, doc);
    W3mmdVarsEvents.emit(event, doc);
    done(null);
  };
}

export default W3mmdVarsEvents;
