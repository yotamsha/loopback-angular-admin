'use strict'
import angular from 'angular'

angular.module('config', [])

  .constant('ENV', { name: 'production', apiUrl: 'http://localhost:3000/api/', siteUrl: '' })

