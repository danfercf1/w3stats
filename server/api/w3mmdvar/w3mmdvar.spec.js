'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let w3mmdvarCtrlStub = {
  index: 'w3mmdvarCtrl.index',
  show: 'w3mmdvarCtrl.show',
  create: 'w3mmdvarCtrl.create',
  upsert: 'w3mmdvarCtrl.upsert',
  patch: 'w3mmdvarCtrl.patch',
  destroy: 'w3mmdvarCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let w3mmdvarIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './w3mmdvar.controller': w3mmdvarCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    expect(w3mmdvarIndex).to.equal(routerStub);
  });

  describe('GET /api/w3mmdvars', function() {
    it('should route to w3mmdvar.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'w3mmdvarCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/w3mmdvars/:id', function() {
    it('should route to w3mmdvar.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'w3mmdvarCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/w3mmdvars', function() {
    it('should route to w3mmdvar.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'w3mmdvarCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/w3mmdvars/:id', function() {
    it('should route to w3mmdvar.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'w3mmdvarCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/w3mmdvars/:id', function() {
    it('should route to w3mmdvar.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'w3mmdvarCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/w3mmdvars/:id', function() {
    it('should route to w3mmdvar.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'w3mmdvarCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
