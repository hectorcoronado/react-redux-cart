import axios from 'axios';

const GET_BOOKS = "GET_BOOKS";
const POST_BOOK = "POST_BOOK";
const DELETE_BOOK = "DELETE_BOOK";
const UPDATE_BOOK = "UPDATE_BOOK";
const POST_BOOK_REJECTED = "POST_BOOK_REJECTED";
const GET_BOOKS_REJECTED = "GET_BOOKS_REJECTED";
const DELETE_BOOK_REJECTED = "DELETE_BOOK_REJECTED";
const RESET_BUTTON = "RESET_BUTTON";

// GET books:
export function getBooks() {
  return function(dispatch) {
    axios.get('/api/books')
      .then(function(response) {
        dispatch({
          type: GET_BOOKS,
          payload: response.data
        })
      })
      .catch(function(err) {
        dispatch({
          type: GET_BOOKS_REJECTED,
          payload: err
        })
      })
  }

}

// POST a book:
export function postBooks(book) {
  return function(dispatch) {
    axios.post('/api/books', book)
      .then(function(response) {
        dispatch({
          type: POST_BOOK,
          payload: response.data
        })
      })
      .catch(function(err) {
        dispatch({
          type: POST_BOOK_REJECTED,
          payload: "There was an error while posting."
        })
      });
  }
};

// DELETE a book:
export function deleteBook(id) {
  return function(dispatch) {
    axios.delete('/api/books/' + id)
      .then(function(response) {
        dispatch({
          type: DELETE_BOOK,
          payload: id
        })
      })
      .catch(function(err) {
        dispatch({
          type: DELETE_BOOK_REJECTED,
          payload: err
        })
      })
  }


};

// UPDATE a book:
export function updateBook(book) {
  return {
    type: UPDATE_BOOK,
    payload: book
  }
};

// RESET form button:
export function resetButton() {
  return {
    type: RESET_BUTTON
  }
};
