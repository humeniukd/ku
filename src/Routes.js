import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Post from './containers/Post';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path='/' exact component={Home} props={childProps} />
    <UnauthenticatedRoute path='/login' exact component={Login} props={childProps} />
    <AuthenticatedRoute path='/posts/:id' exact component={Post} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
