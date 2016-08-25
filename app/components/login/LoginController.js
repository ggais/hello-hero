(function () {
	'use strict';

	angular.module('loginController', [
		'ui.bootstrap',
		'toastr'
	])
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$window', '$location', 'Auth', '$uibModalInstance', 'toastr'];

	/** @ngInject */
	function LoginController($scope, $window, $location, Auth, $uibModalInstance, toastr) {
		var vm = this;

		vm.user = {};
		vm.validUser = true;
		vm.tries = 6;
		vm.lockedOut = true;
		vm.isLoggedIn = Auth.isAuth();
		vm.alreadyExists = false;
		vm.passwordRegEx = '^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$';

		vm.signin = function () {
			$window.localStorage.setItem('user', '');
			$window.localStorage.setItem('com.helloHero', '');
			Auth.signin(vm.user)
				.then(function (token) {
					$window.localStorage.setItem('com.helloHero', token);
					$window.localStorage.setItem('user', vm.user.username);
					vm.validUser = true;
					vm.closeModal();
					$location.path('/profile');
				})
				.catch(function (error) {
					//console.log('boutha')
					vm.validUser = false;
					vm.tries += -1;
					if (vm.tries === 0) {
						vm.lockedOut = false;
					}
					console.error(error);
					showError("Email and/or Password is invalid!", "User not found!");
				});
		};

		vm.signup = function () {
			$window.localStorage.setItem('user', '');
			$window.localStorage.setItem('com.helloHero', '');
			Auth.signup(vm.user_signup)
				.then(function (token) {
					$window.localStorage.setItem('com.helloHero', token);
					$window.localStorage.setItem('user', vm.user_signup.username);
					vm.closeModal();
					$location.path('/profile');
				})
				.catch(function (error) {
					console.error(error);
					showError("Please use a different Email Address to create a new account or login using the existing account!", "Account already exists!");
					console.log('user exists already');
					vm.alreadyExists = true;
				});
		};

		vm.closeModal = function () {
			$uibModalInstance.dismiss();
		};

		if ($location.$$path === '/logout') {
			$window.localStorage.setItem('com.helloHero', '');
			$window.localStorage.setItem('user', '');
			$location.path('/signin');
		}

		function showError(message, caption) {
			if(!caption){
				caption = "Error";
			}

			toastr.clear();
			toastr.error(message, caption, {
				closeButton: true,
				timeOut: 0
			});
		}

	}

} ());


