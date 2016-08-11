var express        = require('express');
var app            = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 3000; // set our port


// get all data/stuff of the body (POST) parameters
if(process.env.MONGODB_ADDRESS) {
	mongoose.connect('mongodb://' + process.env.MONGODB_ADDRESS + ':27017/helloHero');
} else {
	mongoose.connect('mongodb://localhost/helloHero');
}
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
// app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
 // set the static files location /public/img will be /img for users
// routes ==================================================

// start app ===============================================
app.listen(port);                   // startup our app at http://localhost:8080
console.log('Starting sever on port ' + port);       // shoutout to the user
exports = module.exports = app;             // expose app