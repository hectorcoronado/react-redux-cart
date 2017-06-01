// NODE code, can't use ES6:
var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number
});

var booksModel = mongoose.model('Books', booksSchema);

module.exports = booksModel;
