'use strict';

let app = require('../..');
import request from 'supertest';

let newSessions;

describe('Sessions API:', function() {
  describe('GET /api/sessions', function() {
    let sessions;

    beforeEach(function(done) {
      request(app)
        .get('/api/sessions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sessions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sessions).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/sessions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sessions')
        .send({
          name: 'New Sessions',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSessions = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newSessions.name).to.equal('New Sessions');
      expect(newSessions.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/sessions/:id', function() {
    let thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sessions/${newSessions._id}`)
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
      expect(thing.name).to.equal('New Sessions');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/sessions/:id', function() {
    let updatedSessions;

    beforeEach(function(done) {
      request(app)
        .put(`/api/sessions/${newSessions._id}`)
        .send({
          name: 'Updated Sessions',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSessions = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSessions = {};
    });

    it('should respond with the original thing', function() {
      expect(updatedSessions.name).to.equal('New Sessions');
      expect(updatedSessions.info).to.equal('This is the brand new thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/sessions/${newSessions._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated Sessions');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/sessions/:id', function() {
    let patchedSessions;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/sessions/${newSessions._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Sessions' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSessions = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSessions = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedSessions.name).to.equal('Patched Sessions');
      expect(patchedSessions.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/sessions/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/sessions/${newSessions._id}`)
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
        .delete(`/api/sessions/${newSessions._id}`)
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
