'use strict';

angular.module('tracks')
  .constant('TRACKS_SEARCH', {
    controller: 'TracksSearchController',
    templateUrl: 'tracks/templates/track-search.html',
  })
  .controller('TracksSearchController', function ($scope) {
  });
