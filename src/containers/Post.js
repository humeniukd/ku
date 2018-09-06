import React, { Component } from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import Modal from '../containers/Modal';
import { getPostDetails } from '../api';
import { randomName } from '../helpers';
import './Post.scss';

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      id: null,
      userId: null,
      body: null,
      title: null,
      message: ''
    };
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    try {
      const note = await getPostDetails(this.props.match.params.id);
      const { id, userId, body, title } = note;

      !this.isCancelled && this.setState({ id, userId, body, title });
    } catch (error) {
      !this.isCancelled && this.setState({message: error.message});
    }
  }

  closeModal() {
    this.setState({message: ''});
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  render() {
    return (
      <div className='Notes'>
        <Button bsSize='large' block onClick={this.props.history.goBack}>Go back</Button>
        <PageHeader>Details:</PageHeader>
        <p><b>UserId</b>: {randomName()}</p>
        <p><b>Id</b>: {this.state.id}</p>
        <p><b>Title</b>: {this.state.title}</p>
        <p><b>Body</b>: {this.state.body}</p>
        {this.state.message && <Modal title='Ouch' onClose={this.closeModal}>{this.state.message}</Modal>}
      </div>
    );
  }
}
