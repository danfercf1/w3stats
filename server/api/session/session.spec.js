'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let scoreCtrlStub = {
  index: 'scoreCtrl.index',
  show: 'scoreCtrl.show',
  create: 'scoreCtrl.create',
  upsert: 'scoreCtrl.upsert',
  patch: 'scoreCtrl.patch',
  destroy: 'scoreCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let scoreIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './score.controller': scoreCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    expect(scoreIndex).to.equal(routerStub);
  });

  describe('GET /api/scores', function() {
    it('should route to score.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'scoreCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/scores/:id', function() {
    it('should route to score.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'scoreCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/scores', function() {
    it('should route to score.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'scoreCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/scores/:id', function() {
    it('should route to score.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'scoreCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/scores/:id', function() {
    it('should route to score.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'scoreCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/scores/:id', function() {
    it('should route to score.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'scoreCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
