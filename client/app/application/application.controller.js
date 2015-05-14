'use strict';

angular.module('sharemilesApp')
  .controller('ApplicationCtrl',[ '$scope', '$mdSidenav', '$mdBottomSheet', '$q',function ($scope, $mdSidenav, $mdBottomSheet, $q) {
    
    $scope.toggleUsersList = function() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    };
  }]);
