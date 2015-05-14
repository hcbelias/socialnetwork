'use strict';

(function(){

  angular
       .module('sharemilesApp')
       .controller('MainController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          MainController
       ]);

  function MainController( userService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.menu         = getMenuList();
    self.selected     = null ;    
    self.selectMenu   = selectMenu;
    self.toggleMenu   = toggleMenu;
    self.share        = share;


    // *********************************
    // Internal methods
    // *********************************


    function getMenuList(){

    }


    function toggleMenu() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    function selectMenu ( menu ) {
      self.selected = angular.isNumber(menu) ? $scope.menu[menu] : menu;
      self.toggleMenu();
    }

    function share($event) {
        var user = self.selected;

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: '/src/users/view/contactSheet.html',
          controller: [ '$mdBottomSheet', UserSheetController],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function UserSheetController( $mdBottomSheet ) {
          this.user = user;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
