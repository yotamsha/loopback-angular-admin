(function () {
  'use strict';
  angular
    .module('com.module.users')
    .config(function ($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          template: '<login></login>',
          controller: 'LoginCtrl'
        })
        .state('register', {
          url: '/register',
          template: '<register></register>',
          controller: 'RegisterCtrl'
        })
        .state('app.admin.users', {
          abstract: true,
          url: '/users',
          templateUrl: 'modules/admin/users/views/main.html'
        })
        .state('app.admin.users.list', {
          url: '',
          templateUrl: 'modules/admin/users/views/list.html',
          controllerAs: 'ctrl',
          controller: function (users) {
            console.log('users', users);
            this.users = users;
          },
          resolve: {
            users: function (UserService) {
              console.log('users');
              return UserService.find();
            }
          }
        })
        .state('app.admin.users.add', {
          url: '/add',
          templateUrl: 'modules/admin/users/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, UserService, user) {
            this.user = user;
            this.formFields = UserService.getFormFields('add');
            this.formOptions = {};
            this.submit = function () {
              UserService.upsert(this.user).then(function () {
                $state.go('^.list');
              }).catch(function (err) {
                console.log(err);
              });
            };
          },
          resolve: {
            user: function () {
              return {};
            }
          }
        })
        .state('app.admin.users.edit', {
          url: '/edit/:id',
          templateUrl: 'modules/admin/users/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, UserService, user) {
            this.user = user;
            this.formFields = UserService.getFormFields('edit');
            this.formOptions = {};
            this.submit = function () {
              UserService.update(this.user).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            user: function ($stateParams, UserService) {
              return UserService.findById($stateParams.id);
            }
          }
        })
        .state('app.admin.users.view', {
          url: '/view/:id',
          templateUrl: 'modules/admin/users/views/view.html',
          controllerAs: 'ctrl',
          controller: function (user) {
            this.user = user;
          },
          resolve: {
            user: function ($stateParams, UserService) {
              return UserService.findById($stateParams.id);
            }
          }
        })
        .state('app.admin.users.delete', {
          url: '/:id/delete',
          template: '',
          controller: function ($stateParams, $state, UserService) {
            UserService.delete($stateParams.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }
        })
        .state('app.admin.users.profile', {
          url: '/profile',
          templateUrl: 'modules/admin/users/views/profile.html',
          controllerAs: 'ctrl',
          controller: function ($state, UserService, user) {
            this.user = user;
            this.formFields = UserService.getFormFields('edit');
            this.formOptions = {};
            this.submit = function () {
              UserService.update(this.user).then(function () {
                $state.go('^.profile');
              });
            };
          },
          resolve: {
            user: function (User) {
              return User.getCurrent(function (user) {
                return user;
              }, function (err) {
                console.log(err);
              });
            }
          }
        });
    });

})();
