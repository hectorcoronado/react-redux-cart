import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import components:
import BooksList from './components/pages/BooksList';
import Cart from './components/pages/Cart';
import BooksForm from './components/pages/BooksForm';
import Main from './Main';

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
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store.subscribe(function() {
//   console.log('Current state: ', store.getState());
//   // console.log('Current price: ', store.getState()[1].price);
// });

const ROUTES = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList} />
        <Route path="/admin" component={BooksForm} />
        <Route path="/cart" component={Cart} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  ROUTES,
  document.getElementById('app')
);

/*
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
    {
      id: 3,
      title: 'Watchmen',
      description: 'Graphic Novel',
      price: 18
    }
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
*/
