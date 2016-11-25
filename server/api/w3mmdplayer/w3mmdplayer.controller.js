/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/w3mmdplayer              ->  index
 * POST    /api/w3mmdplayer              ->  create
 * GET     /api/w3mmdplayer/:id          ->  show
 * PUT     /api/w3mmdplayer/:id          ->  upsert
 * PATCH   /api/w3mmdplayer/:id          ->  patch
 * DELETE  /api/w3mmdplayer/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {W3mmdPlayers} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of w3mmdplayer
export function index(req, res) {
  return W3mmdPlayers.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single W3mmdPlayers from the DB
export function show(req, res) {
  return W3mmdPlayers.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new W3mmdPlayers in the DB
export function create(req, res) {
  return W3mmdPlayers.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given W3mmdPlayers in the DB at the specified ID
export function upsert(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }

  return W3mmdPlayers.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing W3mmdPlayers in the DB
export function patch(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }
  return W3mmdPlayers.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a W3mmdPlayers from the DB
export function destroy(req, res) {
  return W3mmdPlayers.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
