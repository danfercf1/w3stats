/**
 * Scores model events
 */

'use strict';

import {EventEmitter} from 'events';
let Scores = require('../../sqldb').Scores;
let ScoresEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ScoresEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Scores.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ScoresEvents.emit(`${event}:${doc._id}`, doc);
    ScoresEvents.emit(event, doc);
    done(null);
  };
}

export default ScoresEvents;
