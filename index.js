const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const routes = require('./app/routes');
const session = require('express-session');
const flash = require('connect-flash');

const sessionConfig = require('./config/session');

const app = express();

// Setting the public folder path
app.use(express.static(path.resolve('app', 'public')));

// Configuring the views path
nunjucks.configure(path.resolve('app', 'views'), {
  autoescape: true,
  express: app,
});

// Setting the view engine as njk
app.set('view engine', 'njk');

// This body-parser is able to decode the req.body
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session(sessionConfig));
app.use(flash());

app.use('/', routes);

app.listen(3000);
