import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationRouting from './components/mainPage/index.js';
import store from './store.js';

const root = (
  <Provider store ={store}>
    <Router>
      <NavigationRouting />
    </Router>
  </Provider> 
);

ReactDOM.render(root, document.getElementById('root'));
