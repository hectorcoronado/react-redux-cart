var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/////////
// API //
/////////
var mongoose = require('mongoose');

// bookshop will be the name of the db:
mongoose.connect('mongodb://localhost:27017/bookshop');

var booksModel = require('./models/books.js');

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
      throw err;
    }
    res.json(books)
  });
});
/////////////
// End API //
/////////////

app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Server listening on http://localhost:3001');
});
