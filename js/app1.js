var myApp = angular.module('myApp', ['ngMap', 'ngMaterial', 'angularReverseGeocode', 'firebase']);

myApp.controller('AppCtrl',  function($scope, $mdDialog, $firebase) {
	$scope.demand = {};
	$scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'add.html',
      targetEvent: ev,
    })
    .then(function(answer) {
      console.log("yes!");
      console.log($scope.demand);

      //$scope.demands.$add({text: text});
    }, function() {
      console.log("You cancelled the dialog.");
    });
  }

  /*$scope.$on('mapInitialized', function(evt, evtMap) {
      map = evtMap;*/
      $scope.placeMarker = function(e,ev) {
            var marker = new google.maps.Marker({position: e.latLng, map: map});
            map.panTo(e.latLng);
            $scope.v1 = e.latLng.k;
            $scope.v2 = e.latLng.D;
            $scope.showAdvanced(ev,e);
          
        }
        //console.log($scope.placeMarker(evtMap.e));
    /*});*/
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}