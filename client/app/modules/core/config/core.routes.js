(function () {
  'use strict';
  angular
    .module('com.module.core')
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('router', {
          url: '/router',
          template: '<div class="lockscreen" style="height: 100%"></div>',
          controller: 'RouteCtrl'
        })
        .state('error', {
          url: '/error',
          template: '<div class="text-center alert alert-danger" style="margin: 100px">An error occurred.</div>'
        })

        .state('app', {
          abstract: true,
          url: '',
          templateUrl: 'modules/core/views/app.html',
          controller: 'MainCtrl'
        })
        .state('app.public', {
          abstract: true,
          url: '/home',
          templateUrl: 'modules/core/views/public.html',
        })

        .state('app.public.home', {
          url: '',
          templateUrl: 'modules/core/views/public/home.html',
          controller: 'HomeCtrl'
        })
        .state('app.admin', {
          abstract: true,
          url: '/admin',
          templateUrl: 'modules/core/views/admin.html',

        })
        .state('app.admin.home', {
          url: '',
          templateUrl: 'modules/core/views/admin/home.html',
          controller: 'HomeCtrl'
        });

      $urlRouterProvider.otherwise('/router');
    });

})();
