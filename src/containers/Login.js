import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Modal from '../containers/Modal';
import './Login.scss';
import { PASSWORD_REGEX, SESSION_KEY } from '../config'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      message: ''
    };
    this.closeModal = this.closeModal.bind(this);
  }

  validateForm() {
    return this.state.login.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.login.length > 4 && PASSWORD_REGEX.test(this.state.password)) {
      try {
        sessionStorage.setItem(SESSION_KEY, 1);
      } catch (e) {}
      this.props.userHasAuthenticated(true);
    } else {
      const message = 'Login and/or password is incorrect';
      this.setState({message});
    }
  }

  closeModal() {
    this.setState({message: ''});
  }

  render() {
    return (
      <div className='Login'>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='login' bsSize='large'>
            <ControlLabel>Login</ControlLabel>
            <FormControl
              autoFocus
              type='text'
              value={this.state.login}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId='password' bsSize='large'>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type='password'
            />
          </FormGroup>
          <Button block bsSize='large' disabled={!this.validateForm()} type='submit'>Login</Button>
        </form>
        {this.state.message && <Modal title='Oh no!' onClose={this.closeModal}>{this.state.message}</Modal>}
      </div>
    );
  }
}
