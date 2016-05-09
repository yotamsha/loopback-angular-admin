'use strict'
import angular from 'angular'

import './routes'
import './services'

const NAME = 'com.module.settings'
const MODULES = [
  `${NAME}.routes`,
  `${NAME}.services`,
]

angular.module(NAME, MODULES)
  .run(function($rootScope, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Settings'),
      'app.settings.list', 'fa-cog');

    $rootScope.getSetting = function(key) {
      var valor = '';
      angular.forEach($rootScope.settings.data, function(item) {
        if (item.key === key) {
          valor = item.value;
        }
      });
      return valor;
    };
  })
