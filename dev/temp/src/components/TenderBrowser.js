import React from 'react';
import '../TenderBrowser.css';
import TendersContainer from '../containers/TendersContainer';
import FilterTagsContainer from '../containers/FilterTagsContainer';
import TenderCardsContainer from '../containers/TenderCardsContainer';
import { Divider } from 'semantic-ui-react';

const TenderBrowser  = () => (
  <div>
    <TendersContainer></TendersContainer>
    <FilterTagsContainer></FilterTagsContainer>
    <Divider/>
    <TenderCardsContainer></TenderCardsContainer>
  </div>
)
export default TenderBrowser;