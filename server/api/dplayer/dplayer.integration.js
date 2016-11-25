'use strict';

let app = require('../..');
import request from 'supertest';

let newDotaPlayers;

describe('DotaPlayers API:', function() {
  describe('GET /api/dotaplayers', function() {
    let dotaplayers;

    beforeEach(function(done) {
      request(app)
        .get('/api/dotaplayers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          dotaplayers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(dotaplayers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/dotaplayers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dotaplayers')
        .send({
          name: 'New DotaPlayers',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDotaPlayers = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newDotaPlayers.name).to.equal('New DotaPlayers');
      expect(newDotaPlayers.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/dotaplayers/:id', function() {
    let thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/dotaplayers/${newDotaPlayers._id}`)
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
      expect(thing.name).to.equal('New DotaPlayers');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/dotaplayers/:id', function() {
    let updatedDotaPlayers;

    beforeEach(function(done) {
      request(app)
        .put(`/api/dotaplayers/${newDotaPlayers._id}`)
        .send({
          name: 'Updated DotaPlayers',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDotaPlayers = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDotaPlayers = {};
    });

    it('should respond with the original thing', function() {
      expect(updatedDotaPlayers.name).to.equal('New DotaPlayers');
      expect(updatedDotaPlayers.info).to.equal('This is the brand new thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/dotaplayers/${newDotaPlayers._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated DotaPlayers');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/dotaplayers/:id', function() {
    let patchedDotaPlayers;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/dotaplayers/${newDotaPlayers._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched DotaPlayers' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDotaPlayers = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDotaPlayers = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedDotaPlayers.name).to.equal('Patched DotaPlayers');
      expect(patchedDotaPlayers.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/dotaplayers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/dotaplayers/${newDotaPlayers._id}`)
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
        .delete(`/api/dotaplayers/${newDotaPlayers._id}`)
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
