(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name com.module.common.directive:widgets-sidebar
   * @description
   * # Element which contains the sidebar widgets.
   */
  angular
    .module('com.module.common')
    .directive('widgetsSidebar', function () {
      return {
        templateUrl: 'modules/common/widgets-sidebar/views/widgets-sidebar.html',
        restrict: 'E',
        transclude: true,
        controllerAs: 'ctrl',
        controller : 'WidgetsSidebarCtrl',
        scope: {
        }
      };
    });

})();
