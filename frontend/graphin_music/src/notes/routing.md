

## Redux-First Routing Model (Notes)
[source](https://medium.freecodecamp.org/an-introduction-to-the-redux-first-routing-model-98926ebf53cb)
** def: ** paradigm where Redux = star of routing model. 

** session history: ** stack of locations visited by the current browser tab. 
=> in global `window` object

### methods
`wh = window.history`
`wh.pushState(href)`, `wh.replaceState(href)`, `wh.back()`, `wh.forward()`, `wh.go(index)`
History & Location APIs enable modern client-side routing paradigm = `pushState routing`
`history` = wrapper library for `history & location`


### redux
By using `pushState` routing in a ** Redux app ** it's split 
into two domains: 
Browser History 
&
Redux store

Look at the code for BrowserRouter.js 
```jsx
import warning  from 'warning';
import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory as createdHistory } from 'history';
import Router from './Router';

class BrowserRouter extends React.Component {
  //forces types 
  static propTypes = {
    basename: PropTypes.string, 
    forceRefresh: PropTypes.bool, 
    getUserConfirmation: PropTypes.func, 
    keyLenght: PropTypes.number, 
    children: PropTypes.node
  };

  history = createHistory(this.props);
  componentWillMount() {
    warning(
      !this.props.history, 
      "<BrowserRotuer> irgnores the history prop. To use a custom history, " + 
      "use `import {Router}` instead of `import {BrowserRouter as Router}`."
    );

    render(){
      return <Router history={this.history} children={this.props.children} /> 
    }
  }
  
}

export default BrowserRouter
```


```
history -> React Router 
                      |
                      view
              Redux --|
```

Location data is important, and dynamic part of the app state; hence, should be in the store. 
=> enables Redux tools of: time-travel debugging, easy acess for store connected components. 

### moving location into store
Browser `reads & stores` ** history & location ** from `window`
=> Why does this matter? 
We can keep a copy of the location data in the store and keep it in sync with the browser!
=> `react-router-redux` reading data location from store instead of React Router = bad due to conflicting sources of truth 

## Redux-First Routing 
=> Location is held in store.
=> Location is changed by dispatching via actions.
=> App read location from store ONLY. 
=> Store & browser history in sync 
```
history
|
Redux -> router -> view
```

** Client-side routing **: Starts with navigation and ends with rendering 
=> ** navigation **



