var Q = require('q');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;


var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  firstName: {
    type: String,
    required: false
  },

  lastName: {
    type: String,
    required: false
  },   

  password: {
    type: String,
    required: true
  },

  salt: String,
  teams: {
    type: Array,
    required: false,
    default: []
  },
  admin: {
    type: Boolean,
    required: false,
    default: false
  },
  
  badges: {
    type: Array,
    required: false,
    default: []
  } 
  
});

module.exports = mongoose.model('admins', UserSchema);
