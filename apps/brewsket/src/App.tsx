import React from 'react';
import { Provider } from 'react-redux';

import Router from './navigation';
import { store } from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = {};
}

export default App;
