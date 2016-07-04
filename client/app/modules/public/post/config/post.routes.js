(function () {
  'use strict';
  angular
    .module('com.module.post')
    .config(function ($stateProvider) {
        $stateProvider
          .state('app.public.post', {
            url: 'post/:permaLink',
            params: {
              id: {value: -1}
            },
            templateUrl: 'modules/public/post/views/post.html',
            controller: 'PostCtrl',
            controllerAs: 'ctrl',
            resolve: {
              post: function ($stateParams, PostsService) {
                if ($stateParams.id > 0) {
                  return PostsService.getPost($stateParams.id, {include: ['categories']});
                } else {
                  return PostsService.getPostByParams(
                    {
                      where: {
                        permaLink: $stateParams.permaLink
                      },
                      include: ['categories']
                    });

                }
              }
            }
          });

      }
    );
})();
