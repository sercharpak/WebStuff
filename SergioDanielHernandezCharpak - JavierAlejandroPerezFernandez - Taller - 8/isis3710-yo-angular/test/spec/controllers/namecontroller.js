'use strict';

describe('Controller: NamecontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('t8yoangularApp'));

  var NamecontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NamecontrollerCtrl = $controller('NamecontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NamecontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
