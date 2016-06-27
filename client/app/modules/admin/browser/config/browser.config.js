(function () {
  'use strict';
  angular
    .module('com.module.browser')
    .run(function ($rootScope, Event, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Browser'), 'app.admin.browser.models', 'fa-globe');
    });

})();
