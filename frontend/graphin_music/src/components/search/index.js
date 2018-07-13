import React from 'react';
import { Form, Search } from 'semantic-ui-react';

const middleSearch = {
  justifyContent: 'center', 
  alignItems: 'center'
};

class SearchBar extends React.Component {
  state = {
    artist: '', 
    album: '',
    song: ''
  };


  handleSubmit = (e) => {
    console.log(e);
  }

  //event.target.name === ({ name })
  onChange = (event, { name }) => {
    this.setState({ [event.target.name] :  event.target.value });
  }

  handleSubmit = () => {
    console.log(this.state);
  }

  render(){
    return (
      <div style={middleSearch}>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input 
              fluid label='Artist' name='artist' placeholder='Playboi Carti' 
              value={this.state.artist} onChange={this.onChange}
            />
            <Form.Input 
              fluid label='Album' name='album' placeholder='Die Lit'
              value={this.state.album} onChange={this.onChange}
            />
            <Form.Input 
              fluid label='Song' name='song' placeholder='Long Time' 
              value={this.state.song} onChange={this.onChange}
            />
          </Form.Group>
          <Form.Button onClick={this.handleSubmit}> Submit </Form.Button>
        </Form>
      </div>
    )
  }
};

export default SearchBar;