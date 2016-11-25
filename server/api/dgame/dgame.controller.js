/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/dgame              ->  index
 * POST    /api/dgame              ->  create
 * GET     /api/dgame/:id          ->  show
 * PUT     /api/dgame/:id          ->  upsert
 * PATCH   /api/dgame/:id          ->  patch
 * DELETE  /api/dgame/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {DotaGames} from '../../sqldb';

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

// Gets a list of dgame
export function index(req, res) {
  return DotaGames.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single DotaGames from the DB
export function show(req, res) {
  return DotaGames.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new DotaGames in the DB
export function create(req, res) {
  return DotaGames.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given DotaGames in the DB at the specified ID
export function upsert(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }

  return DotaGames.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing DotaGames in the DB
export function patch(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }
  return DotaGames.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a DotaGames from the DB
export function destroy(req, res) {
  return DotaGames.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
