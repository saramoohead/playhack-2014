'use strict';

angular.module('app', ['ngRoute', 'tracks', 'game'])
  .config(function ($routeProvider, TRACKS_SEARCH) {
    $routeProvider.when('/', {
        controller: 'AppController',
        templateUrl: 'app-index.html',
      })
      .when('/search', TRACKS_SEARCH)
      .otherwise({ redirectTo: '/' });
  })
  .controller('AppController', function ($scope) {
  });
