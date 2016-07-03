(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name loopbackApp
   * @description
   * # loopbackApp
   *
   * Main module of the application.
   */
  angular
    .module('loopbackApp', [
      'angular-loading-bar',
      'angular.filter',
      'angularBootstrapNavTree',
      'angularFileUpload',
      'btford.markdown',
      'oitozero.ngSweetAlert',
      'config',
      'formly',
      'formlyBootstrap',
      'lbServices',
      'monospaced.elastic',
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap',
      'ui.codemirror',
      'ui.gravatar',
      'ui.grid',
      'ui.router',
      'toasty',
      'autofields',
      'gettext',
      'angular-underscore/filters',
      'schemaForm',
      'ui.select',
      'ui.tinymce',

      //common
      'com.module.core',
      'com.module.common',

      // admin
      'com.module.browser',
      'com.module.files',
      'com.module.posts',
      'com.module.mks',
      'com.module.categories',
      'com.module.committees',
      'com.module.sandbox',
      'com.module.settings',
      'com.module.users',

      //public
      'com.module.main',

    ])
    .run(function ($rootScope, $cookies, gettextCatalog) {
      var DEFAULT_LANGUAGE = 'he_IL';
      $rootScope.locales = {
        'en': {
          lang: 'en',
          country: 'US',
          name: gettextCatalog.getString('English')
        },
        'he_IL': {
          lang: 'he_IL',
          country: 'IL',
          name: gettextCatalog.getString('Hebrew')
        }

      };

      var lang = $cookies.lang || DEFAULT_LANGUAGE || navigator.language || navigator.userLanguage;

      $rootScope.locale = $rootScope.locales[lang];

      if (angular.isUndefined($rootScope.locale)) {
        $rootScope.locale = $rootScope.locales[lang];
        if (angular.isUndefined($rootScope.locale)) {
          $rootScope.locale = $rootScope.locales[DEFAULT_LANGUAGE];
        }
      }

      gettextCatalog.setCurrentLanguage($rootScope.locale.lang);

    })
    .run(function (formlyConfig) {
      /*
       ngModelAttrs stuff
       */
      var ngModelAttrs = {};

      function camelize (string) {
        string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
          return chr ? chr.toUpperCase() : '';
        });
        // Ensure 1st char is always lowercase
        return string.replace(/^([A-Z])/, function (match, chr) {
          return chr ? chr.toLowerCase() : '';
        });
      }

      /*
       timepicker
       */
      ngModelAttrs = {};

      // attributes
      angular.forEach([
        'meridians',
        'readonly-input',
        'mousewheel',
        'arrowkeys'
      ], function (attr) {
        ngModelAttrs[camelize(attr)] = {attribute: attr};
      });

      // bindings
      angular.forEach([
        'hour-step',
        'minute-step',
        'show-meridian'
      ], function (binding) {
        ngModelAttrs[camelize(binding)] = {bound: binding};
      });

      formlyConfig.setType({
        name: 'timepicker',
        template: '<timepicker ng-model="model[options.key]"></timepicker>',
        wrapper: [
          'bootstrapLabel',
          'bootstrapHasError'
        ],
        defaultOptions: {
          ngModelAttrs: ngModelAttrs,
          templateOptions: {
            timepickerOptions: {}
          }
        }
      });

      formlyConfig.setType({
        name: 'datepicker',
        template: '<datepicker ng-model="model[options.key]" ></datepicker>',
        wrapper: [
          'bootstrapLabel',
          'bootstrapHasError'
        ],
        defaultOptions: {
          ngModelAttrs: ngModelAttrs,
          templateOptions: {
            datepickerOptions: {}
          }
        }
      });
    });

})();
