import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Details } from '../pages/Details';
import { NotFound } from '../pages/Not-Found';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/details/:id" component={Details} />
    <Route path="/notfound" component={NotFound} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
