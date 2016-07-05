/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.common')
    .controller('siteNavigationCtrl', function (CategoriesService, gettextCatalog, $state, $stateParams) {
      var ctrl = this;
      this.$state = $state;
      this.$stateParams = $stateParams;

      /**
       * When a user is not logged-in:
       * - home link
       * - login link
       * - all categories
       * - site-map links
       */

      /**
       * When a user is logged-in:
       * - user's details widget
       * - user's categories
       * - all categories

       */
      function _init() {
        CategoriesService.getCategories().then(function(response){
          ctrl.categoriesList = response;
        });
      }

/*      this.categoriesList = [
        {
          id: 1,
          slug: 'some-slug',
          text: 'cat1'
        },
        {
          id: 2,
          slug: 'סלאג-עברית',
          text: 'cat2'

        }
      ];*/
      this.primaryLinks = [
        {
          text: gettextCatalog.getString('Home'),
          state: 'app.public.main'
        },
        {
          text: gettextCatalog.getString('Sign in'),
          state: 'app.public.login'
        }
      ];
      this.secondaryLinks = [
        {
          text: gettextCatalog.getString('About'),
          state: 'app.public.about'
        },
        {
          text: gettextCatalog.getString('Privacy'),
          state: 'app.public.privacy'
        }
      ];

      this.navClass = function (state) {
        return state === $state.current.name ? 'active' : '';

      };

      _init();
    });


})();
