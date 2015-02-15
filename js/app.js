var myApp = angular.module('myApp', ['ngMap', 'ngMaterial', 'angularReverseGeocode', 'firebase']);

myApp.controller('AppCtrl',  function($scope, $mdDialog, $firebase) {

  $scope.demand = {};
  var map;
  var rst;
  //firebase
  var ref = new Firebase("https://googlemapangfbase.firebaseio.com/demands");  
  var fb = $firebase(ref);

  $scope.demands = fb.$asArray();
  //endFirebase

  $scope.addDemand = function(x,y){
    $mdDialog.hide();
    $scope.demand.latt = x;
    $scope.demand.lng = y;
    $scope.demands.$add($scope.demand);
  }
  $scope.$on('mapInitialized', function(evt, evtMap) {
      map = evtMap;
      $scope.placeMarker = function(e,ev) {
              $mdDialog.show({
                  controller: DialogController,
                  scope:$scope,
                  targetEvent: ev,
                  templateUrl: 'add.html',

                })
                  .then(function(answer){
                    $scope.addDemand(e.latLng.k,e.latLng.D);
                    var marker = new google.maps.Marker({position: e.latLng, map: map});
                    map.panTo(e.latLng);
                  },function() {
                  });
            }
    });

});
function DialogController($scope, $mdDialog) {
  $scope.demand = {};
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

