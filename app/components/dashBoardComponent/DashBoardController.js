angular.module('helloHero.dashBoard', [])

.controller('DashBoardController', function ($scope, $window, $location, Auth) {
	$scope.user = {};
	$scope.validUser = true;
	$scope.tries = 6;
	$scope.lockedOut = true;
	$scope.isLoggedIn = Auth.isAuth();
	$scope.alreadyExists = false;

	$scope.init();

	$scope.init = function () {
		
	};

	$scope.isAuth = function () {
		return Auth.isAuth();
	};




	

	if($location.$$path === '/logout'){
	  $window.localStorage.setItem('com.helloHero', '');
	  $location.path('/signin');
	}
	
});