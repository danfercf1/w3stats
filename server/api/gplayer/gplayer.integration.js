'use strict';

let app = require('../..');
import request from 'supertest';

let newGamePlayers;

describe('GamePlayers API:', function() {
  describe('GET /api/gameplayers', function() {
    let gameplayers;

    beforeEach(function(done) {
      request(app)
        .get('/api/gameplayers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          gameplayers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(gameplayers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/gameplayers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/gameplayers')
        .send({
          name: 'New GamePlayers',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newGamePlayers = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newGamePlayers.name).to.equal('New GamePlayers');
      expect(newGamePlayers.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/gameplayers/:id', function() {
    let thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/gameplayers/${newGamePlayers._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          thing = res.body;
          done();
        });
    });

    afterEach(function() {
      thing = {};
    });

    it('should respond with the requested thing', function() {
      expect(thing.name).to.equal('New GamePlayers');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/gameplayers/:id', function() {
    let updatedGamePlayers;

    beforeEach(function(done) {
      request(app)
        .put(`/api/gameplayers/${newGamePlayers._id}`)
        .send({
          name: 'Updated GamePlayers',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedGamePlayers = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGamePlayers = {};
    });

    it('should respond with the original thing', function() {
      expect(updatedGamePlayers.name).to.equal('New GamePlayers');
      expect(updatedGamePlayers.info).to.equal('This is the brand new thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/gameplayers/${newGamePlayers._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated GamePlayers');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/gameplayers/:id', function() {
    let patchedGamePlayers;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/gameplayers/${newGamePlayers._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched GamePlayers' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedGamePlayers = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedGamePlayers = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedGamePlayers.name).to.equal('Patched GamePlayers');
      expect(patchedGamePlayers.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/gameplayers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/gameplayers/${newGamePlayers._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when thing does not exist', function(done) {
      request(app)
        .delete(`/api/gameplayers/${newGamePlayers._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
