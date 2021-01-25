import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router as NavRouter, Switch } from 'react-router';

import { Main } from './pages/Main';

const history = createBrowserHistory();

const NavigationRouter: React.FC = () => (
  <NavRouter history={history}>
    <Switch>
      <Route path="" component={Main} />
    </Switch>
  </NavRouter>
);
export default NavigationRouter;
