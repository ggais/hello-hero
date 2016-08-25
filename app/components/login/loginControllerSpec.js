'use strict';

describe('LoginController', function () {
  var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth, $uibModalInstance, vm, toastr;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('helloHero'));
  beforeEach(module(function ($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));
  beforeEach(inject(function ($injector) {

    var fakeModal = {
      dismiss: function () {
      }
    };

    //spyOn($uibModalInstance, 'dismiss').and.returnValue(fakeModal);

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    Auth = $injector.get('Auth');
    $uibModalInstance = fakeModal; //$injector.get('$uibModalInstance');
    toastr = $injector.get('toastr');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    // used to create our AuthController for testing
    createController = function () {
      return $controller('LoginController', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        Auth: Auth,
        $uibModalInstance: $uibModalInstance,
        toastr: toastr
      });
    };

    vm = createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $window.localStorage.removeItem('com.helloHero');
  });

  it('should have a signup method', function () {
    expect(vm.signup).to.be.a('function');
  });

  it('should store token in localStorage after signup', function () {
    // create a fake JWT for auth
    var token = 'sjj232hwjhr3urw90rof';

    // make a 'fake' reques to the server, not really going to our server
    $httpBackend.expectPOST('/api/users/signup').respond({ token: token });
    vm.user_signup = {};
    vm.signup();
    $httpBackend.flush();
    expect($window.localStorage.getItem('com.helloHero')).to.equal(token);
  });

  it('should have a signin method', function () {
    expect(vm.signin).to.be.a('function');
  });

  it('should store token in localStorage after signin', function () {
    // create a fake JWT for auth
    var token = 'sjj232hwjhr3urw90rof';
    $httpBackend.expectPOST('/api/users/signin').respond({ token: token });
    vm.signin();
    $httpBackend.flush();
    expect($window.localStorage.getItem('com.helloHero')).to.equal(token);
  });
});
