(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .run(function ($rootScope) {
      $rootScope.addMenu('Sandbox', 'app.admin.sandbox.index', 'fa-inbox');
    });

})();
