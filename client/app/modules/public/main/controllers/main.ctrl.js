/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.main')
    .controller('MainCtrl', function (todayPosts, popularPosts, gettextCatalog) {
      this.feedPosts = [
        {
          title: gettextCatalog.getString('Popular'),
          posts: popularPosts
        },
        {
          title: gettextCatalog.getString('Going on Today'),
          posts: todayPosts
        }
      ];
    });


})();
