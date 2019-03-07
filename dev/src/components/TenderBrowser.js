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
import { 
  withLocalize,
  Translate 
} from 'react-localize-redux';

const panes = [
  {
    menuItem: (
      <Menu.Item key='tenders'>
        <Button primary >
          <Icon name='file'/><Translate id='tenders.buttons.list'/>
        </Button>
      </Menu.Item>
    ), 
    render: () => <TenderCardsContainer></TenderCardsContainer>
  },
  {
    menuItem: (
      <Menu.Item key='charts'>
          <Button primary>
            <Icon name='chart bar outline'/><Translate id='tenders.buttons.viz'/>
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
export default withLocalize(TenderBrowser);