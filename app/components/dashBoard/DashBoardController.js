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
		User.getUser($window.localStorage.getItem('user')).then(function (response) {	
			$scope.user = response.data;
			if($scope.user.badges) {
				$scope.user.badges.map(function (element) {
					element.date = new Date (element.date).toLocaleString();
					return element;
				});
			}
			
  	}).catch(function (error) {
  		console.log('error getting user information');
  	});
		User.getAllUsers().then(function (response) {
			$scope.users = response.data.map(function (element) {
				return {
					username: element.username,
					badges: element.badges
				};
			});
		}).catch(function (error) {
			console.log('error getting user list');
		});
	};

	$scope.isAuth = function () {
		return Auth.isAuth();
	};

	$scope.submitRecognitionForm = function () {
		var badge = {
			text: $scope.recognitionText,
			date: new Date (),
			initiator: $window.localStorage.getItem('user')
		};
		User.giveRecognition(badge, $scope.receiver).then(function (response) {
			console.log(response);
		});
	};

	if(!$scope.isAuth()){
	  $window.localStorage.setItem('com.helloHero', '');
	  $location.path('/signin');
	}
	$scope.init();
	

	
	
}]);