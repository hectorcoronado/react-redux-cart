import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Carousel, Grid, Col, Row, Button } from 'react-bootstrap';

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
        <Col xs={12} sm={6} md={4} key={booksArr._id}>
          <BookItem
            _id={booksArr._id}
            title={booksArr.title}
            description={booksArr.description}
            image={booksArr.image}
            price={booksArr.price}
          />
        </Col>
      );
    });

    return (
      <Grid>
        <Row>
          <Carousel>
            <Carousel.Item>
              <img width={900} height={300} alt="900x300" src="/images/cuckoos-nest.jpg"/>
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={300} alt="900x300" src="/images/gravitys-rainbow.jpg"/>
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row>
          <Cart />
        </Row>
        <Row style={{marginTop: '15px'}}>
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
