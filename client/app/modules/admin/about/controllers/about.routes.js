(function () {
  'use strict';
  angular
    .module('com.module.about')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.admin.about', {
          abstract: true,
          url: '/about',
          templateUrl: 'modules/about/views/main.html'
        })
        .state('app.admin.about.index', {
          url: '',
          templateUrl: 'modules/about/views/about.html',
          controller: 'AboutCtrl'
        });
    });

})();
