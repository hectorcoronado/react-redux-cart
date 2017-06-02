import React, { Component } from 'react';
import {
  MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import axios from 'axios';

import { postBooks, deleteBook, getBooks } from '../../actions/booksActions';

class BooksForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [{}],
      img: ''
    };
  }

  componentDidMount() {
    this.props.getBooks();

    // get imgs from api:
    axios.get('/api/images/')
      .then(function(response) {
        this.setState({ images: response.data });
      }.bind(this))
      .catch(function(err) {
        this.setState({
          images: 'Error loading image files from server.',
          img: ''
        })
      }.bind(this))
  }

  handleSubmit() {
    // create a book object using findDOMNode & refs in form:
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      image: findDOMNode(this.refs.image).value,
      price: findDOMNode(this.refs.price).value,
    }]
    // call action that we've imported & bound in mapDispatchToProps:
    this.props.postBooks(book);
  }

  onDelete () {
    let bookId = findDOMNode(this.refs.delete).value;

    this.props.deleteBook(bookId);
  }

  // func to select img:
  handleSelect(img) {
    this.setState({
      img: '/images/' + img
    });
  }

  render() {
    const booksList = this.props.books.map((booksArr) => {
      return (
        <option key={booksArr._id}>{booksArr._id}</option>
      )
    });

    const imgList = this.state.images.map(function(imgArr, i) {
      return(
        <MenuItem
          key={i}
          eventKey={imgArr.name}
          onClick={this.handleSelect.bind(this, imgArr.name)}
        >
          {imgArr.name}
        </MenuItem>
      )
    }, this);

    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img} />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select an Image"
                  bsStyle="primary"
                >
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive/>
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
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
          </Col>
        </Row>
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
  return bindActionCreators({ postBooks, deleteBook, getBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
