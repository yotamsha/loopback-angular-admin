(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name com.module.common.directive:content-feed
   * @description
   * # navbar
   */
  angular
    .module('com.module.common')
    .directive('navSideBar', function () {
      return {
        templateUrl: 'modules/common/nav-side-bar/views/nav-side-bar.html',
        restrict: 'E',
        transclude: true,
        scope: {
        },
      };
    });

})();
