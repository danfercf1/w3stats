/**
 * Admin model events
 */

'use strict';

import {EventEmitter} from 'events';
let Admin = require('../../sqldb').Admin;
let AdminEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AdminEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Admin.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    AdminEvents.emit(`${event}:${doc._id}`, doc);
    AdminEvents.emit(event, doc);
    done(null);
  };
}

export default AdminEvents;
