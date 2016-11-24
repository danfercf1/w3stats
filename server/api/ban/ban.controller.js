/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ban              ->  index
 * POST    /api/ban              ->  create
 * GET     /api/ban/:id          ->  show
 * PUT     /api/ban/:id          ->  upsert
 * PATCH   /api/ban/:id          ->  patch
 * DELETE  /api/ban/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Bans} from '../../sqldb';

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

// Gets a list of ban
export function index(req, res) {
  return Bans.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Bans from the DB
export function show(req, res) {
  return Bans.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Bans in the DB
export function create(req, res) {
  return Bans.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Bans in the DB at the specified ID
export function upsert(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }

  return Bans.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Bans in the DB
export function patch(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }
  return Bans.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Bans from the DB
export function destroy(req, res) {
  return Bans.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
