var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

const configDB = require('./config/database.js');

// configuration

mongoose.connect(configDB.url); //connect to my dbs


require('./config/passport'); // pass passport to configurations


// set up express app
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs'); // set up ejs for template viewing

// required for passport

app.use(session({ secret: 'iloveboozyboozyboozebooze' }))
app.use(passport.initialize());
app.use(passport.session()); //persistant login sessions
app.use(flash()) //use connect flash for flash messages stored in session

// routes
require('./app/routes.js')


// launch
app.get('/', (req, res) => res.send('Hello World'));
app.listen(8080, () => console.log('example port listening on 8080'))