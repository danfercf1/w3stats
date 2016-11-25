'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let gplayerCtrlStub = {
  index: 'gplayerCtrl.index',
  show: 'gplayerCtrl.show',
  create: 'gplayerCtrl.create',
  upsert: 'gplayerCtrl.upsert',
  patch: 'gplayerCtrl.patch',
  destroy: 'gplayerCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let gplayerIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './gplayer.controller': gplayerCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    expect(gplayerIndex).to.equal(routerStub);
  });

  describe('GET /api/gplayers', function() {
    it('should route to gplayer.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'gplayerCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/gplayers/:id', function() {
    it('should route to gplayer.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'gplayerCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/gplayers', function() {
    it('should route to gplayer.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'gplayerCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/gplayers/:id', function() {
    it('should route to gplayer.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'gplayerCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/gplayers/:id', function() {
    it('should route to gplayer.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'gplayerCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/gplayers/:id', function() {
    it('should route to gplayer.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'gplayerCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
