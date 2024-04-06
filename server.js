const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const expressMessages = require('express-messages');
const { body } = require('express-validator');

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }); // Update mongoose connection

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash middleware
app.use(flash());

// Express Messages middleware
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Passport Config
//require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables middleware
app.use((req, res, next) => {
  res.locals.cart = req.session.cart || {};
  res.locals.user = req.user || null;
  next();
});

// Importing routers
const pagesRouter = require('./routes/general');

// Use routers as middleware
app.use('/', pagesRouter);

// Set port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, function () {
  console.log('Server is running on port ' + port);
});