'use strict';

angular.module('yourfundFullstackApp')
  .controller('informationexchangectrl', function ($scope, $location) {
    $scope.pageName = 'Information Exchange';

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
