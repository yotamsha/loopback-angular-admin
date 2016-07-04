/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.category')
    .controller('CategoryCtrl', function (category) {
      this.category = category;
      this.posts = category.posts || [];
    });


})();
