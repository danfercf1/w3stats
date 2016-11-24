'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var banCtrlStub = {
  index: 'banCtrl.index',
  show: 'banCtrl.show',
  create: 'banCtrl.create',
  upsert: 'banCtrl.upsert',
  patch: 'banCtrl.patch',
  destroy: 'banCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var banIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './ban.controller': banCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    expect(banIndex).to.equal(routerStub);
  });

  describe('GET /api/bans', function() {
    it('should route to ban.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'banCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/bans/:id', function() {
    it('should route to ban.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'banCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/bans', function() {
    it('should route to ban.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'banCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/bans/:id', function() {
    it('should route to ban.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'banCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/bans/:id', function() {
    it('should route to ban.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'banCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/bans/:id', function() {
    it('should route to ban.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'banCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
