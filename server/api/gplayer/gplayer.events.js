/**
 * GamePlayers model events
 */

'use strict';

import {EventEmitter} from 'events';
let GamePlayers = require('../../sqldb').GamePlayers;
let GamePlayersEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GamePlayersEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  GamePlayers.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    GamePlayersEvents.emit(`${event}:${doc._id}`, doc);
    GamePlayersEvents.emit(event, doc);
    done(null);
  };
}

export default GamePlayersEvents;
