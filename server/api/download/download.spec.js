'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let downloadCtrlStub = {
  index: 'downloadCtrl.index',
  show: 'downloadCtrl.show',
  create: 'downloadCtrl.create',
  upsert: 'downloadCtrl.upsert',
  patch: 'downloadCtrl.patch',
  destroy: 'downloadCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let downloadIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './download.controller': downloadCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    expect(downloadIndex).to.equal(routerStub);
  });

  describe('GET /api/downloads', function() {
    it('should route to download.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'downloadCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/downloads/:id', function() {
    it('should route to download.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'downloadCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/downloads', function() {
    it('should route to download.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'downloadCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/downloads/:id', function() {
    it('should route to download.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'downloadCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/downloads/:id', function() {
    it('should route to download.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'downloadCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/downloads/:id', function() {
    it('should route to download.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'downloadCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
