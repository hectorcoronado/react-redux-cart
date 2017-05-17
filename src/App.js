'use strict';

import { createStore } from 'redux';

// 3. define reducers:
const reducer = function(state=0, action) {
  switch(action.type) {
    case "INCREMENT":
      return state + action.payload;
      break;
  }
  return state;
}

// 1. create store
const store = createStore(reducer);

store.subscribe(function() {
  console.log('Current state: ' + store.getState());
});

// 2. create and dispatch actions:
store.dispatch({
  type: "INCREMENT",
  payload: 1
});
