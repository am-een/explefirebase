var myApp = angular.module('myApp',['ngMaterial']);

myApp.controller('AppCtrl',  function($scope, $mdDialog) {
	$scope.demand={};

	$scope.addUser = function(){
		console.log("helloooooo");
		console.log($scope.demand);
	}
	});