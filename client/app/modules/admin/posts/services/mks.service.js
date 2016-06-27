(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .service('MKsService', function (CoreService, MK) {
      this.getMKs = function () {
        return MK.find({
          filter: {
            order: 'name DESC'
          }
        }).$promise;
      };

    });

})();
