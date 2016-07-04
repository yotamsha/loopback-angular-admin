(function () {
  'use strict';
  angular
    .module('com.module.category')
    .config(function ($stateProvider) {
        $stateProvider
          .state('app.public.category', {
            url: 'category/:slug',
            params: {
              id: {value: -1}
            },
            templateUrl: 'modules/public/category/views/category.html',
            controller: 'CategoryCtrl',
            controllerAs: 'ctrl',
            resolve: {
              category: function ($stateParams, CategoriesService) {
                if ($stateParams.id > 0) {
                  return CategoriesService.getCategory($stateParams.id, {include: ['posts']});
                } else {
                  return CategoriesService.getCategoryByParams(
                    {
                      where: {
                        slug: $stateParams.slug
                      },
                      include: ['posts']
                    });

                }
              }
            }
          });

      }
    );
})();
