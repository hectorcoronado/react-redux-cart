'use strict';

import { createStore } from 'redux';

// import combined reducers:
import reducers from './reducers';

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
});

// CART actions

// ADD to cart:
store.dispatch({
  type: "ADD_TO_CART",
  payload: [{ id: 2 }]
});
