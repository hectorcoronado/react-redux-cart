import axios from 'axios';

const ADD_TO_CART = "ADD_TO_CART";
const GET_CART = "GET_CART";
const UPDATE_CART = "UPDATE_CART";
const DELETE_CART_ITEM = "DELETE_CART_ITEM";
const ADD_TO_CART_REJECTED = "ADD_TO_CART_REJECTED";
const GET_CART_REJECTED = "GET_CART_REJECTED";
const UPDATE_CART_REJECTED = "UPDATE_CART_REJECTED";

// ADD to cart:
export function addToCart(cart) {
  return function(dispatch) {
    axios.post('/api/cart', cart)
      .then(function(response) {
        dispatch({
          type: ADD_TO_CART,
          payload: response.data
        })
      })
      .catch(function(err) {
        dispatch({
          type: ADD_TO_CART_REJECTED,
          msg: 'Error posting to cart.'
        })
      })
  };
}

// GET cart:
export function getCart() {
  return function(dispatch) {
    axios.get('/api/cart')
      .then(function(response) {
        dispatch({
          type: GET_CART,
          payload: response.data
        })
      })
      .catch(function(err){
        dispatch({
          type: GET_CART_REJECTED,
          msg: 'Error getting cart from session.'
        })
      })
  };
}

// UPDATE cart:
export function updateCart(_id, unit, cart) {
  // create copy of current array of books:
  const booksB4Update = cart;
  // determine at which index in array is the book you'll update:
  const indexToUpdate = booksB4Update.findIndex((book) => {
    return book._id === _id;
  });
  // create updated book obj w/new vals & w/same arr index of item to update:
  const updatedBook = {
    ...booksB4Update[indexToUpdate],
    quantity: booksB4Update[indexToUpdate].quantity + unit
  }
  // use slice to remove book at right index, replace w/updated obj, & concat rest:
  let cartUpdate = [
    ...booksB4Update.slice(0, indexToUpdate),
    updatedBook,
    ...booksB4Update.slice(indexToUpdate + 1)
  ];

  return function(dispatch) {
    axios.post('/api/cart', cartUpdate)
      .then(function(response) {
        dispatch({
          type: UPDATE_CART,
          payload: response.data
        })
      })
      .catch(function(err) {
        dispatch({
          type: UPDATE_CART_REJECTED,
          msg: 'Error'
        })
      })
  }
}

// DELETE from cart:
export function deleteCartItem(cart) {
  return {
    type: DELETE_CART_ITEM,
    payload: cart
  }
}
