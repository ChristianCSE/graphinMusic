import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//react-router-redux is deprecated 
import { BrowserRouter as Router, Route } from 'react-router-redux';
//import { ConnectedRouter } from 'connected-react-router';
// import { NavigationRouting } from './App';
const NavigationRouting = require('./App');
// import { Store, history } from './store';
const myStore = require('./store.js');
console.log(myStore);

//<Router history = {myStore.history}>
//</Router>
const root = (
  <Provider store={myStore.store}>
    <Router>
      <NavigationRouting />
    </Router>
  </Provider> 
)

ReactDOM.render(root, document.getElementById('root'));
