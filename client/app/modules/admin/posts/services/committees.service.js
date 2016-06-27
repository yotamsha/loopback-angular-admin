(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .service('CommitteesService', function (CoreService, Committee) {
      this.getCommittees = function () {
        return Committee.find({
          filter: {
            order: 'name DESC'
          }
        }).$promise;
      };

    });

})();
