import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Menu, Grid, Segment } from 'semantic-ui-react';
import SearchBar from '../search/index';

const routes = [
  {
    routeName: 'Main Menu', 
    route: '/'
  },
  {
    routeName: 'Search',
    route: '/search'
  },
  {
    routeName: 'Artist', 
    route: '/artist'
  }
];

class DummyComponent extends React.Component {
  render(){
    return (<div> Yo! </div>);
  }
};


const makeRoute = (routingTo, routeName, key) => {
  return (
    <Menu.Item as={NavLink} to={routingTo} key={key}>
      {routeName}
    </Menu.Item>
  );
};

//pure component (stateless) has not concept of this
const RoutingLinks = (props) => {
  const mappedRoutes = routes.map((route, index) => {
    return makeRoute(route.route, route.routeName, index);
  });
  
  return (
    <Grid.Column width = {2}>
      <Menu fluid vertical tabular>
        {mappedRoutes}
      </Menu>
    </Grid.Column>
  );
};

const Routing = (props) => {
  return (
    <Grid.Column stretched width={14}>
      <Segment> 
        <Switch>
          <Route exact path='/' render={ () => <DummyComponent {...props} /> } />
        </Switch>
      </Segment>
    </Grid.Column>
  );
};

class NavigationRouting extends React.Component {
  render() {
    return ( 
      <Grid>
        <RoutingLinks />
        <Routing />
      </Grid>
    );
  }
};

export default SearchBar;