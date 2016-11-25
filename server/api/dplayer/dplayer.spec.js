'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let dplayerCtrlStub = {
  index: 'dplayerCtrl.index',
  show: 'dplayerCtrl.show',
  create: 'dplayerCtrl.create',
  upsert: 'dplayerCtrl.upsert',
  patch: 'dplayerCtrl.patch',
  destroy: 'dplayerCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let dplayerIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './dplayer.controller': dplayerCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    expect(dplayerIndex).to.equal(routerStub);
  });

  describe('GET /api/dplayers', function() {
    it('should route to dplayer.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'dplayerCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/dplayers/:id', function() {
    it('should route to dplayer.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'dplayerCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/dplayers', function() {
    it('should route to dplayer.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'dplayerCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/dplayers/:id', function() {
    it('should route to dplayer.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'dplayerCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/dplayers/:id', function() {
    it('should route to dplayer.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'dplayerCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/dplayers/:id', function() {
    it('should route to dplayer.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'dplayerCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
