import axios from 'axios';

const GET_BOOKS = "GET_BOOKS";
const POST_BOOK = "POST_BOOK";
const DELETE_BOOK = "DELETE_BOOK";
const UPDATE_BOOK = "UPDATE_BOOK";

// GET books:
export function getBooks() {
  return {
    type: GET_BOOKS
  }
}

// POST a book:
export function postBooks(book) {
  return function(dispatch) {
    axios.post('/books', book)
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

  // return {
  //   type: POST_BOOK,
  //   payload: book
  // }
};

// DELETE a book:
export function deleteBook(id) {
  return {
    type: DELETE_BOOK,
    payload: id
  }
};

// UPDATE a book:
export function updateBook(book) {
  return {
    type: UPDATE_BOOK,
    payload: book
  }
};
