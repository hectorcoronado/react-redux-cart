import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

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
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
