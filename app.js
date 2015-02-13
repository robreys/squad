var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = require('./router');
var hbs = require('hbs');

data = require('./data');

var squads = data.squads;
var users = data.users;
//populate squad user properties

for (var i = 0; i < squads.length; i++) {
    var squad = squads[i];
    //populate members
    for (var j = 0; j < squad.members.length; j++) {
        squad.members[j] = users[squad.members[j]];
    }
    //populate admin
    squad.admin = users[squad.admin];

    //populate feed
    squad.feed.reverse();
    for (var j = 0; j< squad.feed.length; j++) {
        squad.feed[j].author = users[squad.feed[j].author];
    }
}

//populate users squad properties

for (var i =0; i < users.length; i++) {
    var user = users[i];
    //populate squads
    for (var j = 0; j < user.squads.length; j++) {
        user.squads[j] = squads[user.squads[j]];
    }
}

var app = express();

app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// register partials
hbs.registerPartials(__dirname + 'views/partials');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
