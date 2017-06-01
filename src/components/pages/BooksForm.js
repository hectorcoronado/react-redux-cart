import React, { Component } from 'react';
import {
  Well, Panel, FormControl, FormGroup, ControlLabel, Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';

import { postBooks, deleteBook } from '../../actions/booksActions';

class BooksForm extends Component {
  handleSubmit() {
    // create a book object using findDOMNode & refs in form:
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value,
    }]
    // call action that we've imported & bound in mapDispatchToProps:
    this.props.postBooks(book);
  }

  onDelete () {
    let bookId = findDOMNode(this.refs.delete).value;

    this.props.deleteBook(bookId);
  }

  render() {
    const booksList = this.props.books.map((booksArr) => {
      return (
        <option key={booksArr._id}>{booksArr._id}</option>
      )
    })

    return (
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Title"
              ref="title"
            />
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Description"
              ref="description"
            />
          </FormGroup>
          <FormGroup controlId="price">
            <ControlLabel>Price</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Price"
              ref="price"
            />
          </FormGroup>
          <Button
            bsStyle="primary"
            onClick={this.handleSubmit.bind(this)}
          >
            Save Book
          </Button>
        </Panel>
        <Panel style={{marginTop: '25px'}}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>
              Select a Book to Delete
            </ControlLabel>
            <FormControl
              ref="delete"
              componentClass="select"
              placeholder="select"
            >
              <option value="select">select</option>
              {booksList}
            </FormControl>
          </FormGroup>
          <Button
            bsStyle="danger"
            onClick={this.onDelete.bind(this)}
          >Delete Book</Button>
        </Panel>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postBooks, deleteBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
