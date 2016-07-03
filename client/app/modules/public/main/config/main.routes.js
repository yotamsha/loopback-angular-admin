(function () {
  'use strict';
  angular
    .module('com.module.main')
    .config(function ($stateProvider) {
        $stateProvider
          .state('app.public.main', {
            url: '',
            templateUrl: 'modules/public/main/views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl',
            resolve: {
              todayPosts: [
                'PostsService',
                function (PostsService) {
                  return PostsService.getPosts({
                    order: 'meetingDate DESC', limit: 2, where : { status : 'PUBLISHED'}
                  });
                }
              ],
              popularPosts: [
                'PostsService',
                function (PostsService) {
                  return PostsService.getPosts({
                    order: 'meetingDate DESC', limit: 2,  where : { status : 'PUBLISHED'}
                  });
                }
              ]
            }
          });
      }
    );
})();
