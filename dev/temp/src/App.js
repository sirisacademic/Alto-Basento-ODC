import React from 'react';
import './App.css';
import TendersContainer from './containers/TendersContainer';
import FilterTagsContainer from './containers/FilterTagsContainer';

const App  = () => (
  <div>
    <TendersContainer></TendersContainer>
    <FilterTagsContainer></FilterTagsContainer>
  </div>
)
export default App;