'use strict';

let app = require('../..');
import request from 'supertest';

let newW3mmdVars;

describe('W3mmdVars API:', function() {
  describe('GET /api/w3mmdvars', function() {
    let w3mmdvars;

    beforeEach(function(done) {
      request(app)
        .get('/api/w3mmdvars')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          w3mmdvars = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(w3mmdvars).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/w3mmdvars', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/w3mmdvars')
        .send({
          name: 'New W3mmdVars',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newW3mmdVars = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newW3mmdVars.name).to.equal('New W3mmdVars');
      expect(newW3mmdVars.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/w3mmdvars/:id', function() {
    let thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/w3mmdvars/${newW3mmdVars._id}`)
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
      expect(thing.name).to.equal('New W3mmdVars');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/w3mmdvars/:id', function() {
    let updatedW3mmdVars;

    beforeEach(function(done) {
      request(app)
        .put(`/api/w3mmdvars/${newW3mmdVars._id}`)
        .send({
          name: 'Updated W3mmdVars',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedW3mmdVars = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedW3mmdVars = {};
    });

    it('should respond with the original thing', function() {
      expect(updatedW3mmdVars.name).to.equal('New W3mmdVars');
      expect(updatedW3mmdVars.info).to.equal('This is the brand new thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/w3mmdvars/${newW3mmdVars._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated W3mmdVars');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/w3mmdvars/:id', function() {
    let patchedW3mmdVars;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/w3mmdvars/${newW3mmdVars._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched W3mmdVars' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedW3mmdVars = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedW3mmdVars = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedW3mmdVars.name).to.equal('Patched W3mmdVars');
      expect(patchedW3mmdVars.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/w3mmdvars/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/w3mmdvars/${newW3mmdVars._id}`)
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
        .delete(`/api/w3mmdvars/${newW3mmdVars._id}`)
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
