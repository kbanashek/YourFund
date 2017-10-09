'use strict';

describe('Controller: informationexchangectrl', function () {

  // load the controller's module
  beforeEach(module('yourfundFullstackApp'));

  var informationexchangectrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    informationexchangectrl = $controller('informationexchangectrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
