angular.module('loginController', [])
.controller('LoginController', ['$scope', '$window', '$location', 'Auth', function ($scope, $window, $location, Auth) {
	$scope.user = {};
	$scope.validUser = true;
	$scope.tries = 6;
	$scope.lockedOut = true;
	$scope.isLoggedIn = Auth.isAuth();
	$scope.alreadyExists = false;

	$scope.signin = function () {
		$window.localStorage.setItem('user', '');
		$window.localStorage.setItem('com.helloHero', '');
	  Auth.signin($scope.user)
	    .then(function (token) {
	      $window.localStorage.setItem('com.helloHero', token);
	      $window.localStorage.setItem('user', $scope.user.username);
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
	  $window.localStorage.setItem('user', '');
	  $location.path('/signin');
	}
}]);