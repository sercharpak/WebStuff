'use strict';

/**
 * @ngdoc function
 * @name t8yoangularApp.controller:NamecontrollerCtrl
 * @description
 * # NamecontrollerCtrl
 * Controller of the t8yoangularApp
 */
angular.module('t8yoangularApp')
  .controller('NamecontrollerCtrl', function ($scope) {
    $scope.usuario = "Angular";
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
