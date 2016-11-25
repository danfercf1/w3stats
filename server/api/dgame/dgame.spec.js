'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let dgameCtrlStub = {
  index: 'dgameCtrl.index',
  show: 'dgameCtrl.show',
  create: 'dgameCtrl.create',
  upsert: 'dgameCtrl.upsert',
  patch: 'dgameCtrl.patch',
  destroy: 'dgameCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let dgameIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './dgame.controller': dgameCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    expect(dgameIndex).to.equal(routerStub);
  });

  describe('GET /api/dgames', function() {
    it('should route to dgame.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'dgameCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/dgames/:id', function() {
    it('should route to dgame.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'dgameCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/dgames', function() {
    it('should route to dgame.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'dgameCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/dgames/:id', function() {
    it('should route to dgame.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'dgameCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/dgames/:id', function() {
    it('should route to dgame.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'dgameCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/dgames/:id', function() {
    it('should route to dgame.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'dgameCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
