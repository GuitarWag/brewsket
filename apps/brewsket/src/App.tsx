import React from 'react';

import Router from './navigation';

const App: React.FC = () => <Router />;

// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = {};
}

export default App;
