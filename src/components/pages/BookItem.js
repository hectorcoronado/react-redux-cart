import React, { Component } from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addToCart, updateCart } from '../../actions/cartActions'

class BookItem extends Component {
  // each time 'Buy Now' button is clicked, add book to Cart state w/handleCart func:
  handleCart() {
    const book = [...this.props.cart, {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      image: this.props.image,
      price: this.props.price,
      quantity: 1
    }]
    // check if cart is empty:
    if (this.props.cart.length > 0) {
      // cart is not empty:
      let _id = this.props._id;
      let cartIndex = this.props.cart.findIndex((cart) => {
        return cart._id === _id;
      })
      if (cartIndex === -1) {
        // if findIndex found no match, add to cart:
        this.props.addToCart(book);
      } else {
        // if findIndex found a match, we need to update qty w/reducer; 2nd argument will become 'unit':
        this.props.updateCart(_id, 1, this.props.cart);
      }

    } else {
      // cart is empty:
      this.props.addToCart(book);
    }
  }

  render() {
    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Image src={this.props.image} responsive />
          </Col>
        </Row>
        <Row>
          <Col xs={6} sm={8}>
            <h6>{this.props.title}</h6>
            <p>{this.props.description}</p>
            <h6>USD: {this.props.price}</h6>
            <Button
              bsStyle="primary"
              onClick={this.handleCart.bind(this)}
            >
              Buy Now
            </Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addToCart, updateCart }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
