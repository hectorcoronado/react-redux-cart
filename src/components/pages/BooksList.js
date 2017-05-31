import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBooks } from '../../actions/booksActions';

class BooksList extends Component {
  componentDidMount() {
    // dispatch an action:
    this.props.getBooks();
  }

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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
