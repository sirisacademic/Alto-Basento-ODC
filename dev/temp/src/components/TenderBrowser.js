import React from 'react';
import '../TenderBrowser.css';
import TendersContainer from '../containers/TendersContainer';
import FilterTagsContainer from '../containers/FilterTagsContainer';
import TenderCardsContainer from '../containers/TenderCardsContainer';

const TenderBrowser  = () => (
  <div>
    <TendersContainer></TendersContainer>
    <FilterTagsContainer></FilterTagsContainer>
    <TenderCardsContainer></TenderCardsContainer>
  </div>
)
export default TenderBrowser;