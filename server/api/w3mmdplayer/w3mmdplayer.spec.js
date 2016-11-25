'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let w3mmdplayerCtrlStub = {
  index: 'w3mmdplayerCtrl.index',
  show: 'w3mmdplayerCtrl.show',
  create: 'w3mmdplayerCtrl.create',
  upsert: 'w3mmdplayerCtrl.upsert',
  patch: 'w3mmdplayerCtrl.patch',
  destroy: 'w3mmdplayerCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let w3mmdplayerIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './w3mmdplayer.controller': w3mmdplayerCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    expect(w3mmdplayerIndex).to.equal(routerStub);
  });

  describe('GET /api/w3mmdplayers', function() {
    it('should route to w3mmdplayer.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'w3mmdplayerCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/w3mmdplayers/:id', function() {
    it('should route to w3mmdplayer.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'w3mmdplayerCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/w3mmdplayers', function() {
    it('should route to w3mmdplayer.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'w3mmdplayerCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/w3mmdplayers/:id', function() {
    it('should route to w3mmdplayer.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'w3mmdplayerCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/w3mmdplayers/:id', function() {
    it('should route to w3mmdplayer.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'w3mmdplayerCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/w3mmdplayers/:id', function() {
    it('should route to w3mmdplayer.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'w3mmdplayerCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
