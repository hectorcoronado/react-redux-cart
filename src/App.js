'use strict';

import { createStore } from 'redux';

// import combined reducers:
import reducers from './reducers';

// import actions:
import { addToCart } from './actions/cartActions';
import {
  postBooks,
  deleteBook,
  updateBook
} from './actions/booksActions';

// 1. create store
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(function() {
  console.log('Current state: ', store.getState());
  // console.log('Current price: ', store.getState()[1].price);
});

// 2. create and dispatch actions:
// POST a book:
store.dispatch(postBooks(
  [
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
));

store.dispatch(postBooks(
  [{
    id: 3,
    title: 'Watchmen',
    description: 'Graphic Novel',
    price: 18
  }]
));

// DELETE a book:
store.dispatch(deleteBook({ id: 3 }));

// UPDATE a book:
store.dispatch(updateBook(
  {
    id: 2,
    title: "Les crimes de l'amour"
  }
));

// CART actions

// ADD to cart:
store.dispatch(addToCart([{id: 1}]));
