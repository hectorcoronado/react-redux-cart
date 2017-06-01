import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import { getBooks } from '../../actions/booksActions';

import BookItem from './BookItem';
import BooksForm from './BooksForm';
import Cart from './Cart';

class BooksList extends Component {
  componentDidMount() {
    // dispatch an action:
    this.props.getBooks();
  }

  render() {
    const booksList = this.props.books.map((booksArr) => {
      return(
        // <div key={booksArr.id}>
        //   <h2>{booksArr.title}</h2>
        //   <h2>{booksArr.description}</h2>
        //   <h2>{booksArr.price}</h2>
        //   <Button bsStyle='primary'>
        //     Buy Now
        //   </Button>
        // </div>
        <Col xs={12} sm={6} md={4} key={booksArr._id}>
          <BookItem
            _id={booksArr._id}
            title={booksArr.title}
            description={booksArr.description}
            price={booksArr.price}
          />
        </Col>
      );
    });

    return (
      <Grid>
        <Row>
          <Cart />
        </Row>
        <Row style={{marginTop: '15px'}}>
          <Col xs={12} sm={6}>
            <BooksForm />
          </Col>
          {booksList}
        </Row>
      </Grid>
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
