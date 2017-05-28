// BOOKS REDUCERS:
export function booksReducers (state={books: []}, action) {
  switch(action.type) {
    case "POST_BOOK":
      // let books = state.books.concat(action.payload);
      // return {books};
      return { books: [...state.books, ...action.payload] };
      break;
    case "DELETE_BOOK":
      // create copy of current array of books:
      const booksB4Delete = [...state.books];
      // determine at which index in array is the book you'll delete:
      const indexToDelete = booksB4Delete.findIndex((book) => {
        return book.id === action.payload.id;
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
        return book.id === action.payload.id;
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
    default:
      return state;
  }
}