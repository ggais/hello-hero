angular.module('dashBoardController', [])
.controller('DashBoardController', ['$scope', '$window', '$location', 'Auth', 'User', function ($scope, $window, $location, Auth, User) {
	$scope.user = {};
	$scope.validUser = true;
	$scope.tries = 6;
	$scope.lockedOut = true;
	$scope.isLoggedIn = Auth.isAuth();
	$scope.alreadyExists = false;
	$scope.users = [];

	

	$scope.init = function () {
		User.getAllUsers().then(function (response) {
			$scope.users = response.data.map(function (element) {
				return element.username;
			});
		});
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