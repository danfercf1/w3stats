'use strict';

var app = require('../..');
import request from 'supertest';

var newBans;

describe('Bans API:', function() {
  describe('GET /api/bans', function() {
    var bans;

    beforeEach(function(done) {
      request(app)
        .get('/api/bans')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          bans = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(bans).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/bans', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bans')
        .send({
          name: 'New Bans',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBans = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newBans.name).to.equal('New Bans');
      expect(newBans.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/bans/:id', function() {
    var thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/bans/${newBans._id}`)
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
      expect(thing.name).to.equal('New Bans');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/bans/:id', function() {
    var updatedBans;

    beforeEach(function(done) {
      request(app)
        .put(`/api/bans/${newBans._id}`)
        .send({
          name: 'Updated Bans',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBans = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBans = {};
    });

    it('should respond with the original thing', function() {
      expect(updatedBans.name).to.equal('New Bans');
      expect(updatedBans.info).to.equal('This is the brand new thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/bans/${newBans._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated Bans');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/bans/:id', function() {
    var patchedBans;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/bans/${newBans._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Bans' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBans = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBans = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedBans.name).to.equal('Patched Bans');
      expect(patchedBans.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/bans/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/bans/${newBans._id}`)
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
        .delete(`/api/bans/${newBans._id}`)
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
