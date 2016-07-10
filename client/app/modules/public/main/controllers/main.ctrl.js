/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.main')
    .controller('MainCtrl', function (todayPosts, popularPosts, gettextCatalog, CoreService) {
      var ctrl = this;
      CoreService.setPageTitle(gettextCatalog.getString('Main Page Title'));

      var dateLocaleOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      ctrl.feedPosts = [
        {
          title: gettextCatalog.getString('Popular'),
          subtitle: gettextCatalog.getString('Top ranked posts'),
          posts: popularPosts
        },
        {
          title: gettextCatalog.getString('Going on Today'),
          subtitle: new Date().toLocaleDateString('he-HE', dateLocaleOptions),
          posts: todayPosts
        }
      ];
    });


})();
