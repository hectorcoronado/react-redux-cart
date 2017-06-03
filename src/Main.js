import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCart } from '../src/actions/cartActions';

import Menu from './components/pages/Menu';
import Footer from './components/pages/Footer';

class Main extends Component {
  componentDidMount() {
    this.props.getCart();
  }
  
  render() {
    return (
      <div>
        <Menu cartItemsNumber={this.props.totalQty}/>
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalQty: state.cart.totalQty
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCart
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
