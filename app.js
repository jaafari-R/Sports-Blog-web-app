const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const flash = require('connect-flash');


const PORT = 3486;


const app = express();


// View
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Static
app.use(express.static(path.join(__dirname, 'public')));


// Express Messages
app.use(flash());
app.use( (req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


/* ----- Routes ----- */
const index = require('./routes/index');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const manage = require('./routes/manage');

app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);


/* ----- Start App ----- */
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});