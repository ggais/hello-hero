angular.module('loginController', [])
.controller('LoginController', ['$scope', '$window', '$location', 'Auth', function ($scope, $window, $location, Auth) {
	$scope.user = {};
	$scope.validUser = true;
	$scope.tries = 6;
	$scope.lockedOut = true;
	$scope.isLoggedIn = Auth.isAuth();
	$scope.alreadyExists = false;

	$scope.signin = function () {
	  Auth.signin($scope.user)
	    .then(function (token) {
	      $window.localStorage.setItem('com.helloHero', token);
	      $scope.validUser = true;
	      $location.path('/dashBoard');
	    })
	    .catch(function (error) {
	      //console.log('boutha')
	      $scope.validUser = false;
	      $scope.tries += -1;
	      if($scope.tries === 0){
	        $scope.lockedOut = false;
	      }
	      console.error(error);
	    });
	};

	$scope.signup = function () {
	  console.log('signup running...');
	  Auth.signup($scope.user)
	    .then(function (token) {
	      $window.localStorage.setItem('com.helloHero', token);
	      $location.path('/dashBoard');
	    })
	    .catch(function (error) {
	      console.error(error);
	      console.log('user exists already');
	      $scope.alreadyExists = true;
	    });
	};

	if($location.$$path === '/logout'){
	  $window.localStorage.setItem('com.helloHero', '');
	  $location.path('/signin');
	}
}]);