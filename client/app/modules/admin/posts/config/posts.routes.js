(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.admin.posts', {
          abstract: true,
          url: '/posts',
          templateUrl: 'modules/admin/posts/views/main.html'
        })
        .state('app.admin.posts.list', {
          url: '',
          templateUrl: 'modules/admin/posts/views/list.html',
          controllerAs: 'ctrl',
          controller: function (posts) {
            this.posts = posts;
          },
          resolve: {
            posts: [
              'PostsService',
              function (PostsService) {
                return PostsService.getPosts();
              }
            ]
          }
        })
        .state('app.admin.posts.add', {
          url: '/add',
          templateUrl: 'modules/admin/posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post) {
            this.post = post;
            this.formFields = PostsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              PostsService.upsertPost(this.post).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            post: function () {
              return {};
            }
          }
        })
        .state('app.admin.posts.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/admin/posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post) {
            console.log(post);
            this.post = post;
            this.formFields = PostsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              PostsService.upsertPost(this.post).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id);
            }
          }
        })
        .state('app.admin.posts.view', {
          url: '/:id',
          templateUrl: 'modules/admin/posts/views/view.html',
          controllerAs: 'ctrl',
          controller: function (post) {
            this.post = post;
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id);
            }
          }
        })
        .state('app.admin.posts.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post) {
            PostsService.deletePost(post.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id);
            }
          }
        });
    }
  );

})();
