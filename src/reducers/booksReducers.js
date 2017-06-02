const INIT_STATE = {
  books:[]
};

// BOOKS REDUCERS:
export function booksReducers (state=INIT_STATE, action) {
  switch(action.type) {
    case "GET_BOOKS":
      // we GET our books from API to fill arr of books:
      return {...state, books: [...action.payload]}
      break;

    case "POST_BOOK":
      // updates button if post succeeds:
      return {
        books: [...state.books, ...action.payload],
        msg: 'Saved! Click to continue',
        style: "success"
       };
      break;

    case "POST_BOOK_REJECTED":
      // updates button if post fails:
      return { ...state, msg: 'Please try again', style: "danger"}
      break;

    case "DELETE_BOOK":
      // create copy of current array of books:
      const booksB4Delete = [...state.books];
      // determine at which index in array is the book you'll delete:
      const indexToDelete = booksB4Delete.findIndex((book) => {
        return book._id.toString() === action.payload;
      });
      // use slice to remove the book at specific index:
      return {
        books: [
          ...booksB4Delete.slice(0, indexToDelete), ...booksB4Delete.slice(indexToDelete +1)
        ]
      };
      break;

    case "UPDATE_BOOK":
      // create copy of current array of books:
      const booksB4Update = [...state.books];
      // determine at which index in array is the book you'll update:
      const indexToUpdate = booksB4Update.findIndex((book) => {
        return book._id === action.payload._id;
      });
      // create updated book obj w/new vals & w/same arr index of item to update:
      const updatedBook = {
        ...booksB4Update[indexToUpdate],
        title: action.payload.title
      }
      // log to show how bookToUpdate looks:
      console.log('Book to update: ', updatedBook);
      // use slice to remove book at right index, replace w/updated obj, & concat rest:
      return {
        books: [
          ...booksB4Update.slice(0, indexToUpdate),
          updatedBook,
          ...booksB4Update.slice(indexToUpdate + 1)
        ]
      }
      break;

    case "RESET_BUTTON":
      return {
        ...state,
        msg: null,
        style: "primary"
      }
      break;

    default:
      return state;
  }
}
