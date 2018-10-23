import React, { Component } from 'react';
import './App.css';
import TendersContainer from './containers/TendersContainer';

class App extends Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <TendersContainer></TendersContainer>
    );    
  };  
}

export default App;