// CART reducers:

export function cartReducers(state={cart: []}, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: action.payload };
      break;
    case "UPDATE_CART":
      // create copy of current array of books:
      const booksB4Update = [...state.cart];
      // determine at which index in array is the book you'll update:
      const indexToUpdate = booksB4Update.findIndex((book) => {
        return book._id === action._id;
      });
      // create updated book obj w/new vals & w/same arr index of item to update:
      const updatedBook = {
        ...booksB4Update[indexToUpdate],
        quantity: booksB4Update[indexToUpdate].quantity + action.unit
      }
      // use slice to remove book at right index, replace w/updated obj, & concat rest:
      let cartUpdate = [
        ...booksB4Update.slice(0, indexToUpdate),
        updatedBook,
        ...booksB4Update.slice(indexToUpdate + 1)
      ]
      return { ...state, cart: cartUpdate }
      break;
    case "DELETE_CART_ITEM":
      return { ...state, cart: action.payload };
      break;
    default:
      return state;
  }
}
