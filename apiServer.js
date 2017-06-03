var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*******/
// API //
/*******/
var mongoose = require('mongoose');

// bookshop will be the name of the db:
mongoose.connect('mongodb://localhost:27017/bookshop');
var booksModel = require('./models/books.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
///////////////////////////////////
// --->>> SET UP SESSIONS <<<--- //
///////////////////////////////////
/*
NOTE:
secret signs the session id cookie
saveUninitialized: false means save only if there is something added to the cart
resave: false means it won't resave if the cart hasn't changed
ttl is 'time to leave' the session in the db and is currently set to 2 days (normally you'd want 2 to 4 weeks in production)
*/
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

// --->>> POST CART w/SESSION <<<---
app.post('/cart', function(req, res) {
  var cart = req.body;
  // NOTE NOTE NOTE
  req.session.cart = cart; // THIS IS WHAT WE'RE SAVING W/SESS, YOU CAN CHANGE THIS TO STH ELSE IN OTHER PROJECTS!!!
  req.session.save(function(err) {
    if (err) {
      throw err;
    }
    res.json(req.session.cart)
  });
});

//  --->>> GET CART w/SESSION <<<---
app.get('/cart', function(req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});
//////////////////////////////////////
// --->>> END SESSION SET UP <<<--- //
//////////////////////////////////////

///////////
// BOOKS //
///////////
// --->>> POST BOOK(S) <<<---
app.post('/books', function(req, res) {
  var book = req.body;

  booksModel.create(book, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// --->>> GET BOOKS <<<---
app.get('/books', function(req, res) {
  booksModel.find(function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// --->>> UPDATE BOOK <<<---
app.put('/books/:_id', function(req, res) {
  var book = req.body,
      query = req.params._id;

  // if a field doesn't exist $set will add it:
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  // when true, returns the updated document:
  var options = { new: true };

  booksModel.findOneAndUpdate(query, update, options, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// --->>> DELETE BOOK <<<---
app.delete('/books/:_id', function(req, res) {
  var query = { _id: req.params._id };

  booksModel.remove(query, function(err, books) {
    if (err) {
      console.log(err);
    }
    res.json(books)
  });
});
///////////////
// END BOOKS //
///////////////

////////////
// IMAGES //
////////////

// --->>> GET IMAGE <<<---
app.get('/images', function(req,res) {
  var imgFolder = __dirname + '/public/images/';
  // require file system:
  var fs = require('fs');
  // read all files in the dir:
  fs.readdir(imgFolder, function(err, files) {
    if (err) {
      return console.error(err);
    }
    // create empty arr:
    var filesArr = [],
        i = 1;
    // iterate over imgs & add to arr:
    files.forEach(function(file) {
      filesArr.push({ name: file });
      i++;
    });
    // send json res w/array
    res.json(filesArr);
  })
})

////////////////
// END IMAGES //
////////////////

/***********/
// END API //
/***********/


app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Server listening on http://localhost:3001');
});
