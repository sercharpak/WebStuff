'use strict';

/**
 * @ngdoc function
 * @name t8yoangular2App.controller:CommentcontrollerCtrl
 * @description
 * # CommentcontrollerCtrl
 * Controller of the t8yoangular2App
 */
angular.module('t8yoangular2App')
.controller('CommentcontrollerCtrl', function ($scope, $http) {
    $scope.comentario={};
    $scope.posts = [];
    $http.get("https://jsonplaceholder.typicode.com/posts").success(function(data){
console.log(data);
$scope.posts = data;
})
.error(function(error){
console.log(error);
});

$scope.agregar = function(){
$scope.posts.push($scope.comentario);
$scope.comentario={};
}
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
  



