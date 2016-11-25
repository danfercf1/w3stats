'use strict';

let app = require('../..');
import request from 'supertest';

let newGames;

describe('Games API:', function() {
  describe('GET /api/games', function() {
    let games;

    beforeEach(function(done) {
      request(app)
        .get('/api/games')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          games = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(games).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/games', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/games')
        .send({
          name: 'New Games',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newGames = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newGames.name).to.equal('New Games');
      expect(newGames.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/games/:id', function() {
    let thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/games/${newGames._id}`)
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
      expect(thing.name).to.equal('New Games');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/games/:id', function() {
    let updatedGames;

    beforeEach(function(done) {
      request(app)
        .put(`/api/games/${newGames._id}`)
        .send({
          name: 'Updated Games',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedGames = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGames = {};
    });

    it('should respond with the original thing', function() {
      expect(updatedGames.name).to.equal('New Games');
      expect(updatedGames.info).to.equal('This is the brand new thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/games/${newGames._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated Games');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/games/:id', function() {
    let patchedGames;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/games/${newGames._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Games' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedGames = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedGames = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedGames.name).to.equal('Patched Games');
      expect(patchedGames.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/games/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/games/${newGames._id}`)
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
        .delete(`/api/games/${newGames._id}`)
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
