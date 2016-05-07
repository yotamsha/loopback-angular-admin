(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.sandbox', {
          abstract: true,
          url: '/sandbox',
          templateUrl: 'app/sandbox/views/main.html',
          controller: 'SandboxCtrl'
        })
        .state('app.sandbox.index', {
          url: '',
          controller: function ($state) {
            $state.go('app.sandbox.autofields');
          }
        })
        .state('app.sandbox.schemaform', {
          url: '/schemaform',
          templateUrl: 'app/sandbox/views/schemaform.html',
          controller: 'SandboxSchemaformCtrl',
          controllerAs: 'ctrl'
        })
        .state('app.sandbox.forms', {
          url: '/forms',
          templateUrl: 'app/sandbox/views/forms.html',
          controller: 'SandboxFormsCtrl'
        })
        .state('app.sandbox.icons', {
          url: '/icons',
          templateUrl: 'app/sandbox/views/icons.html',
          controller: 'SandboxIconsCtrl'
        })
        .state('app.sandbox.faker', {
          url: '/faker',
          templateUrl: 'app/sandbox/views/faker.html',
          controller: 'SandboxFakerCtrl'
        })
        .state('app.sandbox.coreservice', {
          url: '/coreservice',
          templateUrl: 'app/sandbox/views/coreservice.html',
          controller: 'SandboxCoreServiceCtrl'
        })
        .state('app.sandbox.bootstrap', {
          url: '/bootstrap',
          templateUrl: 'app/sandbox/views/bootstrap.html'
        })
        .state('app.sandbox.trees', {
          url: '/trees',
          templateUrl: 'app/sandbox/views/trees.html',
          controller: 'SandboxTreesCtrl'
        })
        .state('app.sandbox.users', {
          url: '/users',
          template: '<pre>{{users | json}}</pre>',
          controller: function ($scope, User) {
            $scope.users = User.find({}, function (err, data) {
              console.log(data);
              return;
            });
          }
        })
        .state('app.sandbox.dashboard', {
          url: '',
          templateUrl: 'app/sandbox/views/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('app.sandbox.grid', {
          url: '/grid',
          templateUrl: 'app/sandbox/views/grid.html',
          controller: 'SandboxGridCtrl'
        })
        .state('app.sandbox.autofields', {
          url: '/autofields',
          templateUrl: 'app/sandbox/views/autofields.html',
          controller: 'AutoFieldsCtrl'
        });
    });

})();
