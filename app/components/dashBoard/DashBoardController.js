angular.module('dashBoardController', [
		'angucomplete-alt',
		'toastr'
		])
	.controller('DashBoardController', ['$scope', '$window', '$location', 'Auth', 'User', 'toastr', function ($scope, $window, $location, Auth, User, toastr) {
		$scope.user = {};
		$scope.user_signup = {};
		$scope.validUser = true;
		$scope.tries = 6;
		$scope.lockedOut = true;
		$scope.isLoggedIn = Auth.isAuth();
		$scope.alreadyExists = false;
		$scope.users = [];
		$scope.badges = ['Brilliant!', 'Exceptional!', 'Innovative', 'Committed', 'Skillful', 'Resourceful', 'Timesaver', 'Lifesaver'];
		$scope.badgesImagePath = ['assets/images/hero_badge_brilliant.png', 'assets/images/hero_badge_exceptional.png', 'assets/images/hero_badge_innovative.png',
			'assets/images/hero_badge_committed.png', 'assets/images/hero_badge_skillful.png', 'assets/images/hero_badge_resourceful.png',
			'assets/images/hero_badge_timesaver.png', 'assets/images/hero_badge_lifesaver.png',
		];

		$scope.badgesLookup = [];
		$scope.selectedHero = null;
		$scope.selectedHeros = [];
		$scope.messages = [];
		$scope.selectedBadge = null;
		$scope.recognitionMessage = '';

		$scope.init = function () {
			User.getUser($window.localStorage.getItem('user')).then(function (response) {
				$scope.user = response.data;
				if ($scope.user.badges) {
					$scope.user.badges.map(function (element) {
						element.date = new Date(element.date).toLocaleString();
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

			loadBadges();
		};

		$scope.selectBadge = function (badgeName) {
			$scope.selectedBadge = badgeName;
		};

		$scope.isAuth = function () {
			return Auth.isAuth();
		};

		$scope.addHero = function () {
			if ($scope.selectedHero && $scope.selectedHero.originalObject) {
				var itemExists = $scope.selectedHeros.filter(function (e) { return e.username == $scope.selectedHero.originalObject.username; }).length > 0;

				//if ($scope.selectedHeros.indexOf($scope.selectedHero.originalObject) < 1) {
				if (!itemExists) {
					$scope.selectedHeros.push($scope.selectedHero.originalObject);
				}
			}

			$scope.clearSelectedHero();
		};

		$scope.removeHero = function (index) {
			$scope.selectedHeros.splice(index, 1);
		};

		$scope.clearAll = function(){
			$scope.selectedHeros = [];
			$scope.selectedBadge = null;
			$scope.recognitionMessage = '';
		};

		$scope.clearSelectedHero = function (id) {
			if (id) {
				$scope.$broadcast('angucomplete-alt:clearInput', id);
			}
			else {
				$scope.$broadcast('angucomplete-alt:clearInput');
			}
		};

		$scope.submitRecognition = function () {
			toastr.clear();
			$scope.messages = [];
			angular.forEach($scope.selectedHeros, function (value, key) {
				saveBadge(value.username, $scope.selectedBadge);
			});
		};

		function saveBadge(username, badgename) {
			var messageCaption = "Recognition: " + badgename;
			User.getUser(username).then(function (response) {
				var badge = {
					name: badgename,
					date: new Date(),
					initiator: $window.localStorage.getItem('user')
				};

				var receiver = response.data;
				receiver.badges.push(badge);
				User.updateUser(receiver).then(function (response) {

					if (response.status === 201) {
						//$scope.messages.push(username + ": successfully recognized");
						showSuccess(username + ": successfully recognized!", messageCaption);
					}

				});
			}).catch(function (error) {
				console.log('error finding receiver');
				showError(username + ": recognition failed!", messageCaption);
				//$scope.messages.push(username + ": not found!");
			});
		}

		$scope.submitRecognitionForm = function () {
			User.getUser($scope.receiver).then(function (response) {
				var badge = {
					name: $scope.badge_name,
					date: new Date(),
					initiator: $window.localStorage.getItem('user')
				};
				var receiver = response.data;
				receiver.badges.push(badge);
				User.updateUser(receiver).then(function (response) {
					if (response.status === 201) {
						alert('success!');
					}

				});
			}).catch(function (error) {
				console.log('error finding receiver');
			});
		};

		if (!$scope.isAuth()) {
			$window.localStorage.setItem('com.helloHero', '');
			$location.path('/signin');
		}
		$scope.init();


		function loadBadges() {
			angular.forEach($scope.badges, function (value, key) {
				$scope.badgesLookup.push({ name: value, imagePath: $scope.badgesImagePath[key] });
			});
		}

		function showError(message, caption) {
			if(!caption){
				caption = "Error";
			}

			toastr.error(message, caption, {
				closeButton: true,
				timeOut: 0
			});
		}

		function showSuccess(message, caption) {
			if(!caption){
				caption = "Error";
			}

			toastr.success(message, caption, {
				closeButton: true,
				timeOut: 0
			});
		}

	}]);