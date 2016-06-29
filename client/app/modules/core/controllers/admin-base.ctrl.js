(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:HomeCtrl
   * @description Dashboard
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.core')
    .controller('AdminBaseCtrl', function ($scope, $rootScope,$document) {
      $scope.count = {};
      $scope.boxes = $rootScope.dashboardBox;
      $document.find('body').css('direction','ltr');
    });

})();
