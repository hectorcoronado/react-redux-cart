const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_CART = "UPDATE_CART";
const DELETE_CART_ITEM = "DELETE_CART_ITEM";

// ADD to cart:
export function addToCart(book) {
  return {
    type: ADD_TO_CART,
    payload: book
  }
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
  ]
  return {
    type: UPDATE_CART,
    payload: cartUpdate
  }
}

// DELETE from cart:
export function deleteCartItem(cart) {
  return {
    type: DELETE_CART_ITEM,
    payload: cart
  }
}
