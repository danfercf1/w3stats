/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/dplayer              ->  index
 * POST    /api/dplayer              ->  create
 * GET     /api/dplayer/:id          ->  show
 * PUT     /api/dplayer/:id          ->  upsert
 * PATCH   /api/dplayer/:id          ->  patch
 * DELETE  /api/dplayer/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {DotaPlayers} from '../../sqldb';

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

// Gets a list of dplayer
export function index(req, res) {
  return DotaPlayers.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single DotaPlayers from the DB
export function show(req, res) {
  return DotaPlayers.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new DotaPlayers in the DB
export function create(req, res) {
  return DotaPlayers.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given DotaPlayers in the DB at the specified ID
export function upsert(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }

  return DotaPlayers.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing DotaPlayers in the DB
export function patch(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }
  return DotaPlayers.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a DotaPlayers from the DB
export function destroy(req, res) {
  return DotaPlayers.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
