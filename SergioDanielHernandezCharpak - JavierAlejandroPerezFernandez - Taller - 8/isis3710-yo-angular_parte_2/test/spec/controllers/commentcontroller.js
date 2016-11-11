'use strict';

describe('Controller: CommentcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('t8yoangular2App'));

  var CommentcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommentcontrollerCtrl = $controller('CommentcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CommentcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
