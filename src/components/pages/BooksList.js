import React, { Component } from 'react';
import { connect } from 'react-redux';

class BooksList extends Component {
  render() {
    const booksList = this.props.books.map((booksArr) => {
      return(
        <div key={booksArr.id}>
          <h2>{booksArr.title}</h2>
          <h2>{booksArr.description}</h2>
          <h2>{booksArr.price}</h2>
        </div>
      );
    });
    return (
      <div>
        {booksList}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    books: reduxState.books.books
  }
}

export default connect(mapStateToProps)(BooksList);
