/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.post')
    .controller('PostCtrl', function (post) {
      this.post = post || {};
      this.categories = post.categories || [];

    });


})();