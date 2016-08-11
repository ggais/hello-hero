angular.module('helloHero.dashBoard', [])

.controller('DashBoardController', ['$scope', '$window', '$location', 'Auth', function ($scope, $window, $location, Auth) {
	$scope.user = {};
	$scope.validUser = true;
	$scope.tries = 6;
	$scope.lockedOut = true;
	$scope.isLoggedIn = Auth.isAuth();
	$scope.alreadyExists = false;

	

	$scope.init = function () {
		
	};

	$scope.isAuth = function () {
		return Auth.isAuth();
	};



	$scope.init();
	

	if($location.$$path === '/logout'){
	  $window.localStorage.setItem('com.helloHero', '');
	  $location.path('/signin');
	}
	
}]);