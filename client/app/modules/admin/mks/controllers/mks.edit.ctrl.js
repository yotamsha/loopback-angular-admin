/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.mks')
    .controller('editMKCtrl', function ($state, MKsService, mk ) {
      this.mk = mk;

      this.formFields = MKsService.getFormFields();
      this.formOptions = {};

      this.submit = function () {
        // TODO bulk update committee members,categories and committees.
        MKsService.upsertMK(this.mk).then(function () {
          $state.go('^.list');
        });
      };
    });


})();
