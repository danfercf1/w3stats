'use strict';

let app = require('../..');
import request from 'supertest';

let newDownloads;

describe('Downloads API:', function() {
  describe('GET /api/downloads', function() {
    let downloads;

    beforeEach(function(done) {
      request(app)
        .get('/api/downloads')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          downloads = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(downloads).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/downloads', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/downloads')
        .send({
          name: 'New Downloads',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDownloads = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newDownloads.name).to.equal('New Downloads');
      expect(newDownloads.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/downloads/:id', function() {
    let thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/downloads/${newDownloads._id}`)
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
      expect(thing.name).to.equal('New Downloads');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/downloads/:id', function() {
    let updatedDownloads;

    beforeEach(function(done) {
      request(app)
        .put(`/api/downloads/${newDownloads._id}`)
        .send({
          name: 'Updated Downloads',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDownloads = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDownloads = {};
    });

    it('should respond with the original thing', function() {
      expect(updatedDownloads.name).to.equal('New Downloads');
      expect(updatedDownloads.info).to.equal('This is the brand new thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/downloads/${newDownloads._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated Downloads');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/downloads/:id', function() {
    let patchedDownloads;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/downloads/${newDownloads._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Downloads' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDownloads = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDownloads = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedDownloads.name).to.equal('Patched Downloads');
      expect(patchedDownloads.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/downloads/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/downloads/${newDownloads._id}`)
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
        .delete(`/api/downloads/${newDownloads._id}`)
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
