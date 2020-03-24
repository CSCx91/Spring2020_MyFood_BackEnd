var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var familyRouter = require('./routes/family');
var profileRouter = require('./routes/profile');

var app = express();

var rawdata = fs.readFileSync('database_config.json');
var database_config = JSON.parse(rawdata);
var database_url = database_config.url;
database_url = database_url.replace('<username>', database_config.username);
database_url = database_url.replace('<password>', database_config.password);
database_url = database_url.replace('<database>', database_config.database);

mongoose
	.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(function() {
		console.log('Connect to MongoDB successfully');
	})
	.catch(function(err) {
		console.log('--------connect to mongodb error-------------');
		console.log(err);
	});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/family', familyRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Header',
		'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin'
	);
	res.setHeader('Content-Type', 'application/json');
	res.setHeader(
		'Acces-Control-Allow-Method',
		'GET, PUT, POST, OPTIONS, PATCH, DELETE'
	);
	next();
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
