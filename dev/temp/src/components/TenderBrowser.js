import React from 'react';
import '../TenderBrowser.css';
import TendersContainer from '../containers/TendersContainer';
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
      <Menu.Item key='tenders'>
        <Header as ='h3'>Tenders</Header>
      </Menu.Item>
    ), 
    render: () => <TenderCardsContainer></TenderCardsContainer>
  },
  {
    menuItem: (
      <Menu.Item key='charts'>
        <Header as ='h3'>Charts</Header>
      </Menu.Item>
    ),
    render: () => <ChartsContainer></ChartsContainer>
  }
];

const TenderBrowser  = () => (
  <div>
    <TendersContainer></TendersContainer>
    
    <Container className='container-tab-results' style={{marginTop: '4rem'}}>
      <Tab menu={{ secondary: true}}
          panes={panes}>
      </Tab>
    </Container>
  </div>
)
export default TenderBrowser;