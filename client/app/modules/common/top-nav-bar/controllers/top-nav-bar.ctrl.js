/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.common')
    .controller('TopNavBarCtrl', function ($rootScope, $timeout, $scope, AppAuth, $state, DialogsService) {
      var ctrl = this;
      ctrl.currentUser = null;
      function userSessionUpdated(user) {
        ctrl.currentUser = user;
        console.log('currentUser was changed: ' + JSON.stringify(user));
        if (ctrl.currentUser) {
          //ctrl.avatarImageUrl =  ctrl.currentUser.profileImageUrl;
        }
      }

      function _init() {
        ctrl.avatarImageUrl = '../../../../images/default-user-avatar.png';
        ctrl.sessionData = AppAuth.getSessionData();
        userSessionUpdated(ctrl.sessionData.currentUser);
      }

      ctrl.openLoginDialog = function () {

        var modalInstance = DialogsService.openDialog('login');

        modalInstance.result.then(function () {
        }, function () {
        });
      };

      ctrl.logout = function () {
        AppAuth.logout(function () {
        });
      };

      _init();
    });

})();
