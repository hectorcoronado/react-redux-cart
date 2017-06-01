import React, { Component } from 'react';

import Menu from './components/pages/Menu';
import Footer from './components/pages/Footer';

class Main extends Component {
  render() {
    return (
      <div>
        <Menu />
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Main;
