const ADD_TO_CART = "ADD_TO_CART";

// ADD to cart:
export function addToCart(book) {
  return {
    type: ADD_TO_CART,
    payload: book
  }
}
