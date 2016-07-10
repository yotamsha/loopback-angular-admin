/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.common')
    .controller('TopNavBarCtrl', function ($rootScope, $timeout, $scope, AppAuth, $state, $modal) {
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
        userSessionUpdated(ctrl.sessionData.currentUser)
      }

      ctrl.openLoginDialog = function () {

        var modalInstance = $modal.open({
          animation: false,
          templateUrl: 'modules/admin/users/views/login.html',
          controller: 'LoginCtrl',
          size: 'lg',
          resolve: {
/*            items: function () {
              return [1,2];
            }*/
          }
        });

        modalInstance.result.then(function (returnedVal) {
          ctrl.someReturnedValue = returnedVal;
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

      ctrl.logout = function () {
        AppAuth.logout(function () {
          //$state.go('login');
        });
      };

      _init();
    });

})();
