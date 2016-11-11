'use strict';

/**
 * @ngdoc function
 * @name t8yoangular2App.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the t8yoangular2App
 */
angular.module('t8yoangular2App')
  .controller('NavbarCtrl', function ($scope) {
$scope.usuario = false;

$scope.iniciarSesion = function(){
$scope.usuario = true;
}

$scope.cerrarSesion = function(){
$scope.usuario = false;
}

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
