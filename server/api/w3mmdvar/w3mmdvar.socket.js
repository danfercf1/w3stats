/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import W3mmdVarsEvents from './w3mmdvar.events';

// Model events to emit
let events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for(let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    let event = events[i];
    let listener = createListener(`w3mmdvar:${event}`, socket);

    W3mmdVarsEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    W3mmdVarsEvents.removeListener(event, listener);
  };
}
