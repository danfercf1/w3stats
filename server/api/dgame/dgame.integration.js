'use strict';

let app = require('../..');
import request from 'supertest';

let newDotaGames;

describe('DotaGames API:', function() {
  describe('GET /api/dotagames', function() {
    let dotagames;

    beforeEach(function(done) {
      request(app)
        .get('/api/dotagames')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          dotagames = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(dotagames).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/dotagames', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dotagames')
        .send({
          name: 'New DotaGames',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDotaGames = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newDotaGames.name).to.equal('New DotaGames');
      expect(newDotaGames.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/dotagames/:id', function() {
    let thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/dotagames/${newDotaGames._id}`)
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
      expect(thing.name).to.equal('New DotaGames');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/dotagames/:id', function() {
    let updatedDotaGames;

    beforeEach(function(done) {
      request(app)
        .put(`/api/dotagames/${newDotaGames._id}`)
        .send({
          name: 'Updated DotaGames',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDotaGames = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDotaGames = {};
    });

    it('should respond with the original thing', function() {
      expect(updatedDotaGames.name).to.equal('New DotaGames');
      expect(updatedDotaGames.info).to.equal('This is the brand new thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/dotagames/${newDotaGames._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated DotaGames');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/dotagames/:id', function() {
    let patchedDotaGames;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/dotagames/${newDotaGames._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched DotaGames' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDotaGames = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDotaGames = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedDotaGames.name).to.equal('Patched DotaGames');
      expect(patchedDotaGames.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/dotagames/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/dotagames/${newDotaGames._id}`)
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
        .delete(`/api/dotagames/${newDotaGames._id}`)
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
