'use strict';

let app = require('../..');
import request from 'supertest';

let newScores;

describe('Scores API:', function() {
  describe('GET /api/scores', function() {
    let scores;

    beforeEach(function(done) {
      request(app)
        .get('/api/scores')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          scores = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(scores).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/scores', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/scores')
        .send({
          name: 'New Scores',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newScores = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newScores.name).to.equal('New Scores');
      expect(newScores.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/scores/:id', function() {
    let thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/scores/${newScores._id}`)
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
      expect(thing.name).to.equal('New Scores');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/scores/:id', function() {
    let updatedScores;

    beforeEach(function(done) {
      request(app)
        .put(`/api/scores/${newScores._id}`)
        .send({
          name: 'Updated Scores',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedScores = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedScores = {};
    });

    it('should respond with the original thing', function() {
      expect(updatedScores.name).to.equal('New Scores');
      expect(updatedScores.info).to.equal('This is the brand new thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/scores/${newScores._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated Scores');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/scores/:id', function() {
    let patchedScores;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/scores/${newScores._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Scores' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedScores = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedScores = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedScores.name).to.equal('Patched Scores');
      expect(patchedScores.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/scores/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/scores/${newScores._id}`)
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
        .delete(`/api/scores/${newScores._id}`)
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
