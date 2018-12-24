import React from 'react';
import '../TenderBrowser.css';
import TendersContainer from '../containers/TendersContainer';
import TenderCardsContainer from '../containers/TenderCardsContainer';
import { 
  Tab,
  Menu,
  Container,
  Button,
  Icon
} from 'semantic-ui-react';
import ChartsContainer from './charts/ChartsContainer';

const panes = [
  {
    menuItem: (
      <Menu.Item key='tenders'>
        <Button primary >
          <Icon name='file'/>List of tenders
        </Button>
      </Menu.Item>
    ), 
    render: () => <TenderCardsContainer></TenderCardsContainer>
  },
  {
    menuItem: (
      <Menu.Item key='charts'>
          <Button primary>
            <Icon name='chart bar outline'/>Visualizations            
          </Button>
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