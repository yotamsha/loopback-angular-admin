(function () {
  'use strict';
  angular
    .module('com.module.mks')
    .run(function ($rootScope, MK, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('MKs'), 'app.admin.mks.list', 'fa-edit');

      MK.find(function (mks) {
        $rootScope.addDashboardBox(gettextCatalog.getString('MKs'), 'bg-green', 'ion-document-text', mks.length, 'app.admin.mks.list');
      });

    });

})();
