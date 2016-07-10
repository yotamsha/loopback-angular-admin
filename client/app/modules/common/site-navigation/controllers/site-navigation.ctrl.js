/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.common')
    .controller('siteNavigationCtrl', function (CategoriesService, gettextCatalog, $state, $stateParams, AppAuth) {
      var ctrl = this;
      ctrl.$state = $state;
      ctrl.$stateParams = $stateParams;

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
        ctrl.sessionData = AppAuth.getSessionData();

        ctrl.primaryLinks = [
          {
            text: gettextCatalog.getString('Home'),
            state: 'app.public.main'
          },
          {
            text: gettextCatalog.getString('Sign in'),
            state: 'app.public.login',
            showForAnonymousOnly  : true
          }
        ];
        ctrl.secondaryLinks = [
          {
            text: gettextCatalog.getString('About'),
            state: 'app.public.about'
          },
          {
            text: gettextCatalog.getString('Privacy'),
            state: 'app.public.privacy'
          }
        ];

      }

      ctrl.showItem = function(item) {
        if (item.showForAnonymousOnly && ctrl.sessionData.currentUser){ // hide item if no session
          return false;
        } else {
          return true;
        }
      };
      ctrl.navClass = function (state) {
        return state === $state.current.name ? 'active' : '';

      };

      _init();
    });


})();
