/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.common')
    .controller('siteNavigationCtrl', function () {
      this.listItems = [
        {
          text : "home",
          url : "/home"
        }
      ];
    });


})();
