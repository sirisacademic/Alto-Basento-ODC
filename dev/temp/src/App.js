import React from 'react';
import './App.css';
import TendersContainer from './containers/TendersContainer';
import FilterTagsContainer from './containers/FilterTagsContainer';
import TenderCardsContainer from './containers/TenderCardsContainer';

const App  = () => (
  <div>
    <TendersContainer></TendersContainer>
    <FilterTagsContainer></FilterTagsContainer>
    <TenderCardsContainer></TenderCardsContainer>
  </div>
)
export default App;