(function () {
  'use strict';

  /*jshint sub:true*/
  /*jshint camelcase: false */

  angular
    .module('com.module.users')
    .factory('AppAuth', function ($cookies, User, LoopBackAuth, $http, $q, $rootScope, ENV) {
      var self = {

        sessionData : {
          currentUser : null
        },
        /*        $scope.loginResult = User.login({
         include: 'user',
         rememberMe: $scope.credentials.rememberMe
         }, $scope.credentials,
         function (user) {

         console.log(user.id); // => acess token
         console.log(user.ttl); // => 1209600 time to live
         console.log(user.created); // => 2013-12-20T21:10:20.377Z
         console.log(user.userId); // => 1

         var next = $location.nextAfterLogin || '/';
         $location.nextAfterLogin = null;
         AppAuth.currentUser = $scope.loginResult.user;
         CoreService.toastSuccess(gettextCatalog.getString('Logged in'),
         gettextCatalog.getString('You are logged in!'));
         if (next === '/login') {
         next = '/';
         }
         $location.path(next);

         },
         function (res) {
         $scope.loginError = res.data.error;
         });*/
        login: function (data, cb) {
          LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
          User.login({
              include: 'user',
              rememberMe: data.rememberMe
            }, data,function (response) {
              if (response && response.id) {
                LoopBackAuth.currentUserId = response.userId;
                LoopBackAuth.accessTokenId = response.id;
              }
              if (LoopBackAuth.currentUserId === null) {
                delete $cookies['accessToken'];
                LoopBackAuth.accessTokenId = null;
              }
              LoopBackAuth.save();
              if (LoopBackAuth.currentUserId && response && response.user) {
                self.sessionData.currentUser = response.user;
                $rootScope.$broadcast('USER_SESSION_CHANGED',self.sessionData);
                cb(self.sessionData.currentUser);

              } else {
                cb({});
              }
            }, function () {
              console.log('User.login() err', arguments);
              LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId =
                null;
              LoopBackAuth.save();
              cb({});
            });
        },

        logout: function (cb) {
          //Destroy the access token.
          User.logout({'access_token': LoopBackAuth.accessTokenId}, function () {
            //Destory both cookies that get created.
            delete $cookies['access_token'];
            delete $cookies['accessToken'];
            //Perform the Passport Logout
            $http.post(ENV.apiUrl + 'auth/logout');

          });
          self.sessionData.currentUser = null;
          $rootScope.$broadcast('USER_SESSION_CHANGED',self.sessionData);

          cb();
        },

        ensureHasCurrentUser: function (cb) {
          if ((!self.sessionData.currentUser || self.sessionData.currentUser.id === 'social') && $cookies.accessToken) {
            LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
            $http.get(ENV.apiUrl + '/auth/current')
              .then(function (response) {
                if (response.data.id) {
                  LoopBackAuth.currentUserId = response.data.id;
                  LoopBackAuth.accessTokenId = $cookies.accessToken.substring(
                    2, 66);
                }
                if (LoopBackAuth.currentUserId === null) {
                  delete $cookies['accessToken'];
                  LoopBackAuth.accessTokenId = null;
                }
                LoopBackAuth.save();
                self.sessionData.currentUser = response.data;
                var profile = self.sessionData.currentUser && self.sessionData.currentUser.profiles &&
                  self.sessionData.currentUser.profiles.length && self.sessionData.currentUser.profiles[
                    0];
                if (profile) {
                  self.sessionData.currentUser.name = profile.profile.name;
                }
                cb(self.sessionData.currentUser);
              }, function () {
                console.log('User.getCurrent() err', arguments);
                LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId =
                  null;
                LoopBackAuth.save();
                cb({});
              });
          } else {
            if (self.sessionData.currentUser) {
              console.log('Using cached current user.');
            }
            cb(self.sessionData.currentUser);
          }
        },

        requestCurrentUser: function () {
          var deferred = $q.defer();
          self.ensureHasCurrentUser(function () {
            User.getCurrent(function (response) {
              console.log("got user: ", response);
              self.sessionData.currentUser = response;
              $rootScope.$broadcast('USER_SESSION_CHANGED',self.sessionData);

              deferred.resolve(response);
            }, function (err) {
              self.sessionData.currentUser = null;
              $rootScope.$broadcast('USER_SESSION_CHANGED',self.sessionData);
              console.log("Could not get user session: ", err);
              deferred.resolve(null);

            });

          });
          return deferred.promise;
        },

        getCurrentUser: function () {
          return self.sessionData.currentUser;
        },

        getSessionData : function(){
          return self.sessionData;
        }

      };
      return self;
    });

})();
