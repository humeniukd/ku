import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import Routes from './Routes';
import { SESSION_KEY } from './config'
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    };
  }

  componentDidMount() {
    try {
      if (sessionStorage.getItem(SESSION_KEY))
        this.userHasAuthenticated(true);
    } catch(e) {}

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch(e) {}
    this.userHasAuthenticated(false);

    this.props.history.push('/login');
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout
    };

    return (!this.state.isAuthenticating &&
      <div className='App container'>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Ku</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <Fragment>
                    <NavItem onClick={this.handleLogout}>
                      Logout
                    </NavItem>
                  </Fragment>
                : <Fragment>
                    <NavItem href='/login'>
                      Login
                    </NavItem>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
