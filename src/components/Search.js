import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { debounce } from 'lodash'

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
    this.onSubmit = debounce(props.onSubmit, 500);
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    this.onSubmit(event.target.value);
  }

  render() {
    return (
      <form className='SearchForm'>
        <FormGroup bsSize='large' controlId='query'>
          <FormControl
            type='text'
            autoComplete='off'
            value={this.state.query}
            onChange={this.handleFieldChange}
            placeholder='Search'
          />
        </FormGroup>
      </form>
    );
  }
}
