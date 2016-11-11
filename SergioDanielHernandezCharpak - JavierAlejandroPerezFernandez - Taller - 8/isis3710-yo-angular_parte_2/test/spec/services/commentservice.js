'use strict';

describe('Service: Commentservice', function () {

  // load the service's module
  beforeEach(module('t8yoangular2App'));

  // instantiate service
  var Commentservice;
  beforeEach(inject(function (_Commentservice_) {
    Commentservice = _Commentservice_;
  }));

  it('should do something', function () {
    expect(!!Commentservice).toBe(true);
  });

});
