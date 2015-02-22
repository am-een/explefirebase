var myApp = angular.module('myApp', ['ngMap', 'ngMaterial', 'angularReverseGeocode', 'firebase']);

myApp.controller('AppCtrl',  function($scope, $mdDialog, $firebase, $mdToast) {

  $scope.demand = {};
  var map;
  var rst;
  //firebase
  var ref = new Firebase("https://googlemapangfbase.firebaseio.com/demands");  
  var fb = $firebase(ref);

  $scope.demands = fb.$asArray();
  //endFirebase


  var dialogContent = '\
        <md-content class="md-padding"> \
          <md-subheader class="md-primary md-sticky-no-effect"> \
          <h2>Add request</h2> \
          </md-subheader> \
            <md-input-container> \
                <label>Company</label> \
                <input required name="comp" ng-model="demand.comp"> \
            </md-input-container> \
            <md-input-container> \
                <label>First Name</label> \
                <input required name="firstName" ng-model="demand.firstName"> \
            </md-input-container> \
            <md-input-container> \
                <label>Last Name</label> \
                <input required name="lastName" ng-model="demand.lastName"> \
            </md-input-container> \
            <md-input-container> \
                <label>Description</label> \
                <textarea required name="description" ng-model="demand.description" columns="3" md-maxlength="200"></textarea> \
            </md-input-container> \
        </md-content> \
        <div class="md-actions"> \
            <!-- type=button is needed so form uses submit button --> \
            <md-button type=button ng-click="cancel()">Cancel</md-button> \
            <md-button class="md-primary" type="submit" ng-click="hide()" ng-disabled="!(!!demand.comp && !!demand.firstName  && !!demand.lastName && !!demand.description)">Okay</md-button> \
        </div> \
        ';

    var addDemDialog = '<md-dialog aria-label="Add request" style="width:50%">' + dialogContent + '</md-dialog>';

  $scope.$on('mapInitialized', function(evt, evtMap) {
      map = evtMap;
      $scope.placeMarker = function(e,ev) {
            $mdDialog.show({
                template: addDemDialog,
                targetEvent: ev,
                locals: { locLatt: e.latLng.k,
                          locLng:e.latLng.D },
                controller: 'DialogController'
            })
            .then(function(answer) {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Demand added!')
                );
            }, function() {
            });
            }
    });
});

myApp.controller('DialogController', function($scope, $mdDialog, $firebase, locLatt, locLng) {
  var ref = new Firebase("https://googlemapangfbase.firebaseio.com/demands");  
  var fb = $firebase(ref);
  $scope.demands = fb.$asArray();


    $scope.hide = function() {
        $mdDialog.hide($scope.demand);
        $scope.demand.latt = locLatt;
        $scope.demand.lng = locLng;
        $scope.demands.$add($scope.demand);
    };
    
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
});