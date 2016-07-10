/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.common')
    .controller('siteNavigationCtrl', function (CategoriesService, gettextCatalog, $state, $stateParams, AppAuth, DialogsService) {
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

      ctrl.openLoginDialog = function () {

        var modalInstance = DialogsService.openDialog('login');

        modalInstance.result.then(function () {
        }, function () {
        });
      };

      ctrl.navClass = function (state) {
        return state === $state.current.name ? 'active' : '';

      };

      _init();
    });


})();
