'use strict';

angular.module('yourfundFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('informationexchange', {
        url: '/informationexchange',
        templateUrl: 'app/informationexchange/informationexchange.html',
        controller: 'informationexchangectrl'
      });
  });