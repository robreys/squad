var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = require('./router');
var hbs = require('hbs');
var mongoose = require('mongoose');
var moment = require('moment');

var Woopra = require('woopra');
woopra = new Woopra('squad-base.herokuapp.com');

var local_database_name = 'squad';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

//mongoose models
userModel = require('./models/user');
squadModel = require('./models/squad');
messageModel = require('./models/message');

var app = express();
//cookie setup
app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY'}));

//randomly display views
/*
    NOTE: Refreshing a page will not randomize the view. In order for
    a random view to appear, you must restart the server process.
    ie: if running on localhost, cancel process, and run npm start again.
    (not sure how to do this on heroku)
*/
var random = false; //whether view should be randomized
var select = ''; //or alternatively '_2' for second directory
version = null;
//assign view
var random_num = Math.random();
if (random == false) {
    app.set('views', path.join(__dirname, 'views' + select));
    app.use(express.static(path.join(__dirname, 'public' + select)));  
    version = 'a';
}
else if (random_num > 0.5) {
    app.set('views', path.join(__dirname, 'views_2'));
    app.use(express.static(path.join(__dirname, 'public_2')));
    version = 'b';
}

else {
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));
    version = 'a';
}
app.set('view engine', 'hbs');
// register partials
hbs.registerPartials(__dirname + 'views/partials');
// register helpers
hbs.registerHelper('format_date', function(timestamp) {
    return moment(timestamp).fromNow();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Add routes here
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
