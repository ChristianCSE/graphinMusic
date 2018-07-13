


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
};

const RoutingLinks = (props) => {
  return (
    <Grid.Column width = {2}>
      <Menu fluid vertical tabular>
        <Menu.Item as={NavLink} to={`/`} >
          Main Menu
        </Menu.Item>
      </Menu> 
    </Grid.Column>
  );
}

const DummyComp = (props='nothing') => () => <DummyComponent {...this.props} serving={'blah'} />

const Routing = (props='nothing') => {
  return (
    <Grid.Column stretched width={14}>
      <Segment>
        <Switch>
          <Route 
            exact path='/' 
            //render={ () => <DummyComponent {...this.props} serving={'blah'}/> } 
            render={DummyComp('...this.props')}
          />
        </Switch>
      </Segment>
    </Grid.Column>
  );
}



class NavigationRouting extends Component {
  render(){
    return(
      <Grid>
        <RoutingLinks />
        <Routing />
      </Grid>
    );
  }
}

//need to do mapping
//const conn = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(NavigationRouting);

export default NavigationRouting;
