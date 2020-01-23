var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var apartmentsRouter = require('./routes/apartments');
var countryRouter = require('./routes/country');
var cityRouter = require('./routes/city');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apartments', apartmentsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/countries', countryRouter);
app.use('/city', cityRouter);

module.exports = app;
