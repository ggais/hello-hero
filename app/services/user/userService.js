angular.module('userService', [])
.factory('User', ['$http', '$location', '$window', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var getAllUsers = function () {
    return $http({
      method: 'GET',
      url: '/api/users'
    })
    .then(function (resp) {
      return resp;
    });
  };

  var getUser = function (username) {
    console.log(username)
    return $http({
      method: 'GET',
      url: '/api/users/' + username
    })
    .then(function (resp) {
      return resp;
    });
  };

  var giveRecognition = function (badge, receiver) {
    return $http({
      method: 'PUT',
      url: '/api/users/' + receiver,
      data: badge
    })
    .then(function (resp) {
      return resp;
    });
  };

  return {
    getAllUsers: getAllUsers,
    getUser: getUser,
    giveRecognition: giveRecognition
  };
}]);
