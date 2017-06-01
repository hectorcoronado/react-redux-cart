import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Panel, Col, Row, Well, Button, ButtonGroup, Label
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';

import { deleteCartItem, updateCart } from '../../actions/cartActions';

class Cart extends Component {
  onDelete(_id) {
    // create copy of state's cart (which we can access bc of mapStateToProps):
    const currentBookToDelete = this.props.cart;
    // determine at which index in array is the book you'll delete:
    const indexToDelete = currentBookToDelete.findIndex((cart) => {
      return cart._id === _id;
    });
    // use slice to remove the book at specific index:
    let cartAfterDelete = [
      ...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete +1)
    ];
    this.props.deleteCartItem(cartAfterDelete);
  }

  onIncrement(_id) {
    this.props.updateCart(_id, 1);
  }

  onDecrement(_id, quantity) {
    if (quantity > 1) {
      this.props.updateCart(_id, -1);
    }
  }

  renderEmpty() {
    return(<div></div>)
  }

  renderCart() {
    const cartItemsList = this.props.cart.map((cartArr) => {
      return(
        <Panel key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>USD: {cartArr.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>Qty: <Label bsStyle="success">{cartArr.quantity}</Label></h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{minWidth: '300px'}}>
                <Button
                  onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}
                  bsStyle="default"
                  bsSize="small"
                >
                  -
                </Button>
                <Button
                  onClick={this.onIncrement.bind(this, cartArr._id)}
                  bsStyle="default"
                  bsSize="small"
                >
                  +
                </Button>
                <span>     </span>
                <Button
                  bsStyle="danger"
                  bsSize="small"
                  onClick={this.onDelete.bind(this, cartArr._id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this)
    return(
      <Panel
        header="Cart"
        bsStyle="primary"
      >
        {cartItemsList}
      </Panel>
    )
  }

  render() {
    if(this.props.cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteCartItem, updateCart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
