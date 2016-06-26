(function () {
  'use strict';

  angular
    .module('com.module.pages')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.admin.pages', {
          abstract: true,
          url: '/pages',
          templateUrl: 'modules/pages/views/main.html'
        })
        .state('app.admin.pages.list', {
          url: '',
          templateUrl: 'modules/pages/views/list.html',
          controllerAs: 'ctrl',
          controller: function (pages) {
            this.pages = pages;
          },
          resolve: {
            pages: function (PageService) {
              return PageService.find();
            }
          }
        })
        .state('app.admin.pages.add', {
          url: '/add',
          templateUrl: 'modules/pages/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PageService, page) {
            this.editorOptions = {
              theme: 'monokai',
              lineWrapping: true,
              lineNumbers: true,
              mode: 'markdown'
            };
            this.page = page;
            this.formFields = PageService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              PageService.upsert(this.page).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            page: function () {
              return {
                content: '# Hi!\n\n## This is a markdown editor.\n\n    fine code goes here \n\n- lists \n- go \n- here ' +
                '\n\n*Find* **more information** about `markdown` [Here](https://daringfireball.net/projects/markdown/basics)!'
              };
            }
          }
        })
        .state('app.admin.pages.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/pages/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PageService, page) {
            this.editorOptions = {
              theme: 'monokai',
              lineWrapping: true,
              lineNumbers: true,
              mode: 'markdown'
            };
            this.page = page;
            this.formFields = PageService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              PageService.upsert(this.page).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            page: function ($stateParams, PageService) {
              return PageService.findById($stateParams.id);
            }
          }
        })
        .state('app.admin.pages.view', {
          url: '/:id',
          templateUrl: 'modules/pages/views/view.html',
          controllerAs: 'ctrl',
          controller: function (page) {
            this.page = page;
          },
          resolve: {
            page: function ($stateParams, PageService) {
              return PageService.findById($stateParams.id);
            }
          }
        })
        .state('app.admin.pages.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($stateParams, $state, PageService) {
            PageService.delete($stateParams.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }
        });
    });

})();
