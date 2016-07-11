(function () {
  'use strict';

  /*jshint sub:true*/
  /*jshint camelcase: false */

  angular
    .module('com.module.users')
    .factory('AppAuth', function ($cookies, User, LoopBackAuth, $http, $q, $rootScope, ENV, $location) {
      var self = {

        sessionData : {
          currentUser : null
        },

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
            $location.path("/");
          });
          self.sessionData.currentUser = null;
          $rootScope.$broadcast('USER_SESSION_CHANGED',self.sessionData);

          cb();
        },

        ensureHasCurrentUser: function (cb) {

          if ((!self.sessionData.currentUser || self.sessionData.currentUser.id === 'social') && $cookies.accessToken) { // token is stored in the the browser's cookie.
            LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
            $http.get(ENV.apiUrl + '/auth/current') // retrieve user's data
              .then(function (response) {
                if (response.data.id) {
                  LoopBackAuth.currentUserId = response.data.id;
                  LoopBackAuth.accessTokenId = $cookies.accessToken.substring(
                    2, 66);
                }
                if (LoopBackAuth.currentUserId === null) { // no valid session retrieved from server - clean browser's token.
                  delete $cookies['accessToken'];
                  LoopBackAuth.accessTokenId = null;
                }
                LoopBackAuth.save();
                self.sessionData.currentUser = response.data;

                // social sign ups
                var profile = self.sessionData.currentUser && self.sessionData.currentUser.profiles &&
                  self.sessionData.currentUser.profiles.length && self.sessionData.currentUser.profiles[
                    0];
                if (profile) {
                  self.sessionData.currentUser.name = profile.profile.name;
                }

                cb(self.sessionData.currentUser);
              }, function () {
                console.log('User.getCurrent() err', arguments);
                LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
                LoopBackAuth.save();
                cb({});
              });
          } else { // session is stored in the the browser's cookie.
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
              console.log('got user: ', response);
              self.sessionData.currentUser = response;
              $rootScope.$broadcast('USER_SESSION_CHANGED',self.sessionData);
              deferred.resolve(response);
            }, function (err) {
              self.sessionData.currentUser = null;
              $rootScope.$broadcast('USER_SESSION_CHANGED',self.sessionData);
              console.log('Could not get user session: ', err);
              deferred.resolve(null);

            });

          });
          return deferred.promise;
        },

        requireUserRole: function (role) {
          var deferred = $q.defer();
          self.requestCurrentUser().then(function(user){
            if (user && user.roles && _.findWhere(user.roles, {name : role})){
              deferred.resolve(user);
            } else {
              $location.path('/');
            }
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
