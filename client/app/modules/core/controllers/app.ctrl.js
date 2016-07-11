(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:AppCtrl
   * @description Login Controller
   * @requires $scope
   * @requires $state

   * @requires CoreService
   * @requires User
   * @requires gettextCatalog
   **/
  angular
    .module('com.module.core')
    .controller('AppCtrl', function ($scope, $rootScope) {

      $scope.menuoptions = $rootScope.menu;

    });

})();
