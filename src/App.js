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
      const booksB4Delete = [...state.books];
      // determine at which index in array is the book you'll delete:
      const indexToDelete = booksB4Delete.findIndex((book) => {
        return book.id === action.payload.id;
      });
      // use slice to remove the book at specific index:
      return {
        books: [
          ...booksB4Delete.slice(0, indexToDelete), ...booksB4Delete.slice(indexToDelete +1)
        ]
      };
      break;
    case "UPDATE_BOOK":
      // create copy of current array of books:
      const booksB4Update = [...state.books];
      // determine at which index in array is the book you'll update:
      const indexToUpdate = booksB4Update.findIndex((book) => {
        return book.id === action.payload.id;
      });
      // create updated book obj w/new vals & w/same arr index of item to update:
      const updatedBook = {
        ...booksB4Update[indexToUpdate],
        title: action.payload.title
      }
      // log to show how bookToUpdate looks:
      console.log('Book to update: ', updatedBook);
      // use slice to remove book at right index, replace w/updated obj, & concat rest:
      return {
        books: [
          ...booksB4Update.slice(0, indexToUpdate),
          updatedBook,
          ...booksB4Update.slice(indexToUpdate + 1)
        ]
      }
      break;
    default:
      return state;
  }
}

// 1. create store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

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

// UPDATE a book:
store.dispatch({
  type: "UPDATE_BOOK",
  payload: {
    id: 2,
    title: "Les crimes de l'amour"
  }
})
