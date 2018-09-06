import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'
import App from './App';

const WrappedComponent = withRouter(App);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><WrappedComponent /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
