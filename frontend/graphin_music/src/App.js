


import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Grid, Segment } from 'semantic-ui-react';



class DummyComponent extends Component {
  render() {
    return (
      <div>Nothing</div>
    );
  }
}


class NavigationRouting extends Component {
  
  render() {
    return(  
      <Grid>
        <Grid.Column width={2}>
          <Switch>
            <Route 
              path='/*'
              render={() => <DummyComponent />}
            />
          </Switch>
        </Grid.Column>
      </Grid>
    );
  }
}
//need to do mapping
//const conn = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(NavigationRouting);

export default {
  NavigationRouting
};
