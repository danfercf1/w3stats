/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/admin              ->  index
 * POST    /api/admin              ->  create
 * GET     /api/admin/:id          ->  show
 * PUT     /api/admin/:id          ->  upsert
 * PATCH   /api/admin/:id          ->  patch
 * DELETE  /api/admin/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Admins} from '../../sqldb';

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

// Gets a list of admin
export function index(req, res) {
  return Admins.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Admins from the DB
export function show(req, res) {
  return Admins.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Admins in the DB
export function create(req, res) {
  return Admins.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Admins in the DB at the specified ID
export function upsert(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }

  return Admins.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Admins in the DB
export function patch(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }
  return Admins.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Admins from the DB
export function destroy(req, res) {
  return Admins.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
