import React from 'react';
import '../TenderBrowser.css';
import TendersContainer from '../containers/TendersContainer';
import FilterTagsContainer from '../containers/FilterTagsContainer';
import TenderCardsContainer from '../containers/TenderCardsContainer';
import { 
  Tab,
  Menu,
  Header,
  Container
} from 'semantic-ui-react';
import ChartsContainer from './charts/ChartsContainer';

const panes = [
  {
    menuItem: (
      <Menu.Item>
        <Header as ='h3'>Tenders</Header>
      </Menu.Item>
    ), 
    render: () => <TenderCardsContainer></TenderCardsContainer>
  },
  {
    menuItem: (
      <Menu.Item>
        <Header as ='h3'>Charts</Header>
      </Menu.Item>
    ),
    render: () => <ChartsContainer></ChartsContainer>
  }
];

const TenderBrowser  = () => (
  <div>
    <TendersContainer></TendersContainer>
    <FilterTagsContainer></FilterTagsContainer>
    
    <Container className='container-tab-results'>
      <Tab menu={{ secondary: true}}
          panes={panes}>
      </Tab>
    </Container>
  </div>
)
export default TenderBrowser;