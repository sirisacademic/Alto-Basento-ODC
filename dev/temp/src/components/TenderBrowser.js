import React from 'react';
import '../TenderBrowser.css';
import TendersContainer from '../containers/TendersContainer';
import FilterTagsContainer from '../containers/FilterTagsContainer';
import TenderCardsContainer from '../containers/TenderCardsContainer';
import { Divider } from 'semantic-ui-react';
import ChartsContainer from './charts/ChartsContainer';

const TenderBrowser  = () => (
  <div>
    <TendersContainer></TendersContainer>
    <FilterTagsContainer></FilterTagsContainer>
    <Divider/>
    <ChartsContainer></ChartsContainer>
    <TenderCardsContainer></TenderCardsContainer>
  </div>
)
export default TenderBrowser;