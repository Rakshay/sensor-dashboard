'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store/index';
import Dashboard from './dashboard';

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  }
}

App.displayName = 'App';

// Bootstrap client
if (typeof window !== 'undefined') {
  window.onload = () => {
    ReactDOM.render(React.createElement(App), document.getElementById('container'));
  };
}

export default App;
