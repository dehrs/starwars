import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Details } from '../pages/Details';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/details/:id" exact component={Details} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
