'use strict';

let app = require('../..');
import request from 'supertest';

let newW3mmdPlayers;

describe('W3mmdPlayers API:', function() {
  describe('GET /api/w3mmdplayers', function() {
    let w3mmdplayers;

    beforeEach(function(done) {
      request(app)
        .get('/api/w3mmdplayers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          w3mmdplayers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(w3mmdplayers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/w3mmdplayers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/w3mmdplayers')
        .send({
          name: 'New W3mmdPlayers',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newW3mmdPlayers = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newW3mmdPlayers.name).to.equal('New W3mmdPlayers');
      expect(newW3mmdPlayers.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/w3mmdplayers/:id', function() {
    let thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/w3mmdplayers/${newW3mmdPlayers._id}`)
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
      expect(thing.name).to.equal('New W3mmdPlayers');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/w3mmdplayers/:id', function() {
    let updatedW3mmdPlayers;

    beforeEach(function(done) {
      request(app)
        .put(`/api/w3mmdplayers/${newW3mmdPlayers._id}`)
        .send({
          name: 'Updated W3mmdPlayers',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedW3mmdPlayers = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedW3mmdPlayers = {};
    });

    it('should respond with the original thing', function() {
      expect(updatedW3mmdPlayers.name).to.equal('New W3mmdPlayers');
      expect(updatedW3mmdPlayers.info).to.equal('This is the brand new thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/w3mmdplayers/${newW3mmdPlayers._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated W3mmdPlayers');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/w3mmdplayers/:id', function() {
    let patchedW3mmdPlayers;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/w3mmdplayers/${newW3mmdPlayers._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched W3mmdPlayers' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedW3mmdPlayers = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedW3mmdPlayers = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedW3mmdPlayers.name).to.equal('Patched W3mmdPlayers');
      expect(patchedW3mmdPlayers.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/w3mmdplayers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/w3mmdplayers/${newW3mmdPlayers._id}`)
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
        .delete(`/api/w3mmdplayers/${newW3mmdPlayers._id}`)
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
