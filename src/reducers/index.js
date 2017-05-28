import { combineReducers } from 'redux';

// import reducers:
import { booksReducers } from './booksReducers';
import { cartReducers } from './cartReducers';

/*
combineReducers takes an obj as arg
 - this obj represents our state
 - we assign our reducers from our different files to a key
 - and we have them available under a single obj
*/

// combine the reducers:
export default combineReducers({
  books: booksReducers,
  cart: cartReducers
})
