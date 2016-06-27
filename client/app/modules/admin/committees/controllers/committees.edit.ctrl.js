/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.committees')
    .controller('editCommitteeCtrl', function ($state, CommitteesService, committee ) {
      this.committee = committee;

      this.formFields = CommitteesService.getFormFields();
      this.formOptions = {};

      this.submit = function () {
        // TODO bulk update committee members,committees and committees.
        CommitteesService.upsertCommittee(this.committee).then(function () {
          $state.go('^.list');
        });
      };
    });


})();
