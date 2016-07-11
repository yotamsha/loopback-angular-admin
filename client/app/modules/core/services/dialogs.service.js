/**
 * Created by yotam on 10/07/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.core')
    .service('DialogsService', function ($modal) {

      var dialogsMap = {
        login : {
          templateUrl: 'modules/admin/users/views/login.html',
          controller: 'LoginCtrl'
        },

        register : {
          templateUrl: 'modules/admin/users/views/register.html',
          controller: 'RegisterCtrl'
        }
      };

      this.openDialog = function (dialogName) {
        var dialog = dialogsMap[dialogName];
        return $modal.open({
          templateUrl : dialog.templateUrl,
          controller : dialog.controller,
          size : 'lg',
          controllerAs : 'ctrl',
          windowTemplateUrl : 'modules/core/views/elements/dialog-template.html'
        });
      };

    });

})();
