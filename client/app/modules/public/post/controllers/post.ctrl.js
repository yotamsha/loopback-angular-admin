/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.post')
    .controller('PostCtrl', function (post, CoreService) {
      CoreService.setPageTitle(post.title);

      this.post = post || {};
      this.categories = post.categories || [];

    });


})();
