'use strict';

describe('DashController', function () {
  var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth, User, toastr, $uibModalInstance;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('helloHero'));
  beforeEach(inject(function ($injector) {

    var fakeModal = {
      dismiss: function () {
      }
    };

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    Auth = $injector.get('Auth');
    User = $injector.get('User');
    toastr = $injector.get('toastr');
    $uibModalInstance = fakeModal;

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    // used to create our AuthController for testing
    createController = function () {
      return $controller('DashBoardController', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        Auth: Auth,
        User: User,
        toastr: toastr,
        $uibModalInstance: $uibModalInstance
      });
    };

    createController();
  }));


  it('should have a init function', function () {
    expect($scope.init).to.be.a('function');
  });

  it('should have a function to submit a recognition form', function () {
    expect($scope.submitRecognitionForm).to.be.a('function');
  });

});
