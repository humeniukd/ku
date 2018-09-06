import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import ReactDOM from "react-dom";

it('AuthenticatedRoute: renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AuthenticatedRoute component={()=>null} props={{isAuthenticated: true}} /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
