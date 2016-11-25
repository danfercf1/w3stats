/**
 * Downloads model events
 */

'use strict';

import {EventEmitter} from 'events';
let Downloads = require('../../sqldb').Downloads;
let DownloadsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DownloadsEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Downloads.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DownloadsEvents.emit(`${event}:${doc._id}`, doc);
    DownloadsEvents.emit(event, doc);
    done(null);
  };
}

export default DownloadsEvents;
