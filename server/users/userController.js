var User = require('./userModel.js');
    Q = require('q');
    jwt = require('jwt-simple');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var getUsers = Q.nbind(User.find, User);

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log('SIGNUP IS OCCURING WITH', username, ':', password);

    // check to see if user already exists
    findUser({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          return createUser({
            username: username,
            password: password
          });
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }, 

  getAllUsers: function (req, res, next) {
    getUsers({})
      .then(function (user) {
        if (!user) {
          next(new Error('No users exist'));
        } else {
          res.status(200).json(user);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  getUser: function (req, res, next) {
    findUser({username: req.params.username})
      .then(function (user) {
        if (!user) {
          next(new Error('No users exist'));
        } else {
          res.status(200).json(user);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  editUser: function (req, res, next) {
    findUser({username: req.params.username})
      .then(function (user) {
        if (!user) {
          next(new Error('No users exist'));
        } else {  
          user.badges.push(req.body);
          user.save(function (err, user) {
            if(err) {
              next(err);
            } else {
              res.status(201).json(user);
            }
          });      
        }
      })
      .fail(function (error) {
        next(error);
      });
  }

  
};
