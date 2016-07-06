/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.common')
    .controller('TopNavBarCtrl', function ($rootScope, $timeout,$scope) {
      var ctrl = this;
      ctrl.currentUser = null;
      function userLoaded(){
        ctrl.currentUser = $scope.currentUser;
        console.log('currentUser was changed: ' + JSON.stringify($scope.currentUser));
        if (ctrl.currentUser){
          ctrl.avatarImageUrl = (ctrl.currentUser && ctrl.currentUser.profileImageUrl) || '../../../../images/default-user-avatar.png';
        }
      }

      function _init() {
        $scope.$watch('currentUser', function() {
          userLoaded();
        },true);

      }

      _init();
    });

})();
