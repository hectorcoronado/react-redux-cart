'use strict';

import { createStore } from 'redux';

// 3. define reducers:
const reducer = function(state={books: []}, action) {
  switch(action.type) {
    case "POST_BOOK":
      // let books = state.books.concat(action.payload);
      // return {books};
      return { books: [...state.books, ...action.payload] };
      break;
    case "DELETE_BOOK":
      // create copy of current array of books:
      const currentBooks = [...state.books];
      // determine at which index in array is the book you'll delete:
      const bookToDelete = currentBooks.findIndex(function(book) {
        return book.id === action.payload.id;
      });
      // use slice to remove the book at specific index:
      return { books: [...currentBooks.slice(0, bookToDelete), ...currentBooks.slice(bookToDelete +1)] };
    default:
      return state;
  }
}

// 1. create store
const store = createStore(reducer);

store.subscribe(function() {
  console.log('Current state: ', store.getState());
  // console.log('Current price: ', store.getState()[1].price);
});

// 2. create and dispatch actions:
store.dispatch({
  type: "POST_BOOK",
  payload: [
    {
      id: 1,
      title: 'Ulysses',
      description: 'Modernist',
      price: 10
    },
    {
      id: 2,
      title: 'Aline et Valcour',
      description: 'Sadist',
      price: 15
    },
  ]
});

// CREATE/POST a book:
store.dispatch({
  type: "POST_BOOK",
  payload:
    [{
      id: 3,
      title: 'Watchmen',
      description: 'Graphic Novel',
      price: 18
    }]
});

// DELETE a book:
store.dispatch({
  type: "DELETE_BOOK",
  payload: { id: 3 }
});
