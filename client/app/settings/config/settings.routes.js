(function () {
  'use strict';
  angular
    .module('com.module.settings')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.settings', {
          abstract: true,
          url: '/settings',
          templateUrl: 'app/settings/views/main.html'
        })
        .state('app.settings.list', {
          url: '',
          templateUrl: 'app/settings/views/list.html',
          controllerAs: 'ctrl',
          controller: function (settings) {
            this.settings = settings;
          },
          resolve: {
            settings: function (SettingService) {
              return SettingService.find();
            }
          }
        })
        .state('app.settings.add', {
          url: '/add',
          templateUrl: 'app/settings/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, SettingService, setting) {
            this.setting = setting;
            this.formFields = SettingService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              SettingService.upsert(this.setting).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            setting: function () {
              return {};
            }
          }
        })
        .state('app.settings.edit', {
          url: '/:id/edit',
          templateUrl: 'app/settings/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, SettingService, setting) {
            this.setting = setting;
            this.formFields = SettingService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              SettingService.upsert(this.setting).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            setting: function ($stateParams, SettingService) {
              return SettingService.findById($stateParams.id);
            }
          }
        })
        .state('app.settings.view', {
          url: '/:id',
          templateUrl: 'app/settings/views/view.html',
          controllerAs: 'ctrl',
          controller: function (setting) {
            this.setting = setting;
          },
          resolve: {
            setting: function ($stateParams, SettingService) {
              return SettingService.findById($stateParams.id);
            }
          }
        })
        .state('app.settings.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($stateParams, $state, SettingService) {
            SettingService.delete($stateParams.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }
        });
    });

})();
