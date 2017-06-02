// CART reducers:

export function cartReducers(state={cart: []}, action) {
  switch (action.type) {
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;

    case "ADD_TO_CART":
      // totalAmount & totalQty are calc'd below in 'totals', which returns an obj w/these properties:
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      };
      break;

    /* NOTE: All of this code needs to be refactored to make the cart updateable and persistent; we will move & execute all the logic in the cartUpdate action PRIOR to sending it to the reducer as action.payload

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
      return {
        ...state,
        cart: cartUpdate,
        totalAmount: totals(cartUpdate).amount,
        totalQty: totals(cartUpdate).qty
      }
      break;
    */

    case "UPDATE_CART":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;

    case "DELETE_CART_ITEM":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      };
      break;
    default:
      return state;
  }
}

// calculate totals:
export function totals(payloadArr) {
  const totalAmount = payloadArr.map((cartArr) => {
    return cartArr.price * cartArr.quantity;
  }).reduce((a, b) => {
    return a + b;
  }, 0);

  const totalQty = payloadArr.map((qty) => {
    return qty.quantity;
  }).reduce((a, b) => {
    return a + b;
  }, 0);

  return {
    amount: totalAmount.toFixed(2),
    qty: totalQty
  }
}
