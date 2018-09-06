import React, { Component } from 'react';
import { Col, Row, Button, ListGroup, ListGroupItem, Jumbotron, Glyphicon } from 'react-bootstrap';
import SearchForm from '../components/Search';
import Modal from '../containers/Modal';
import './Home.scss';
import { getPosts } from '../api';
import { routine } from '../helpers';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      q: '',
      limit: 0,
      posts: [],
      message: ''
    };
    this.onSearch = this.onSearch.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) return;
    try {
      const origPosts = await getPosts();
      const posts = origPosts.sort((a,b) => b.id - a.id);
      this.interval = setInterval(() => this.setState(routine(posts)), 1000);
    } catch (e) {
      !this.isCanceled && this.setState({message: e.message});
    }
    !this.isCanceled && this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    this.isCanceled = true;
    clearInterval(this.interval);
  }

  onSearch(q) {
    this.setState({ q: q.toLowerCase() });
  }

  closeModal() {
    this.setState({message: ''});
  }

  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  renderPostsList(posts) {
    return posts.map(note =>
        <ListGroupItem
            key={note.id}
            href={`/posts/${note.id}`}
            onClick={this.handleNoteClick}
            header={`UserId: ${note.userId}`}
        >
          {'Title: ' + note.title}
        </ListGroupItem>
    );
  }

  renderPosts() {
    return (
      <div className='posts'>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Button bsSize='large' block onClick={this.props.handleLogout}>Logout</Button>
          </Col>
          <Col xs={12} sm={6} md={8}>
            { this.state.isLoading && <Glyphicon glyph='refresh' className='spinning' />}
            <SearchForm pullRight onSubmit={this.onSearch}/>
          </Col>
        </Row>
        <ListGroup>
          {!this.state.isLoading && this.renderPostsList(this.state.posts)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className='Home'>
        {this.props.isAuthenticated ? this.renderPosts() : <Jumbotron><h1>Hello, world!</h1></Jumbotron>}
        {this.state.message && <Modal title='Oops' onClose={this.closeModal}>{this.state.message}</Modal>}
      </div>
    );
  }
}
