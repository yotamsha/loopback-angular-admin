/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.category')
    .controller('CategoryCtrl', function (category, gettextCatalog) {
      this.category = category;
      this.posts = category.posts || [];
      this.feedPosts = [
        {
          title: gettextCatalog.getString('Popular'),
          subtitle: gettextCatalog.getString('Top ranked posts'),
          posts: this.posts
        }

      ];

    });


})();
