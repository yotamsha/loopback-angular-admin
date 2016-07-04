/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.common')
    .controller('siteNavigationCtrl', function () {
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
      this.categoriesList = [
        {
          id :1,
          slug : 'some-slug',
          text : 'cat1'
        },
        {
          id :2,
          slug : 'סלאג-עברית',
          text : 'cat2'

        }
      ];
      this.listItems = [
        {
          text : 'home',
          url : '/home'
        },
        {
          text : 'category1',
          url : '/category/1'
        }
      ];
    });


})();
