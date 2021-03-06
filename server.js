const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const multer = require('multer');
const session = require('express-session');
const Cells = require('./models/cells');
const Prisoners = require('./models/prisoners');

// require our database
require('./db/db');


// setting up controllers
const cellControllers = require('./controllers/cellsController');
const prisonerController = require('./controllers/prisonersController');
const authController = require('./controllers/authController');

// connect public folder to use css and bootstrap
app.use(express.static('public'));

// use app.session to control login / logout sessions
app.use(session({
  secret: 'This is some random secret string',
  resave: false,
  saveUninitialized: false
}));


// setting up the middle-ware for our controllers
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));

// 
app.use('/cells', cellControllers);
app.use('/prisoners', prisonerController);
app.use('/auth', authController);


// this thing..? I forgot i need to no
app.get('/', async (req, res) => {
  try {

    const cellsFound = await Cells.find({});
    const prisonersFound = await Prisoners.find({});
    res.render('index.ejs', {
      prisoners: prisonersFound,
      cells: cellsFound
    });
  } catch (err) {
    res.send(err);
  }

});

// The whole thing listens through here:
app.listen(3000, () => {
  console.log('Listening on port 3000')
});