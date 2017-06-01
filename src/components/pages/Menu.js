import React, { Component } from 'react';
import {
  Nav, NavItem, Navbar, Badge
} from 'react-bootstrap';

class Menu extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {/* eventKey is identifier in case we want to add children's links: */}
            <NavItem eventKey={1} href="/about">About</NavItem>
            <NavItem eventKey={2} href="/contact">Contact Us</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/admin">Admin</NavItem>
            <NavItem
              eventKey={2}
              href="/cart"
            >
              Your Cart
              {/* ternary to dynamically update Cart's badge: */}
              {
                (this.props.cartItemsNumber > 0) ?
                (<Badge className="badge">{this.props.cartItemsNumber}</Badge>):
                ('')
              }
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
