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

var local_database_name = 'squad';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

//mongoose models
userModel = require('./models/user');
squadModel = require('./models/squad');
messageModel = require('./models/message');

var app = express();

app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY'}));

var random = true;
// view engine setup
//randomly assign value
var random_num = Math.random();
console.log(random_num);
if (random_num > 0.5 && random) {
    app.set('views', path.join(__dirname, 'views_2'));
    app.use(express.static(path.join(__dirname, 'public_2')));
}

else {
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));
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
