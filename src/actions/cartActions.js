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
export function updateCart(_id, unit) {
  return {
    type: UPDATE_CART,
    _id,
    unit
  }
}

// DELETE from cart:
export function deleteCartItem(cart) {
  return {
    type: DELETE_CART_ITEM,
    payload: cart
  }
}
