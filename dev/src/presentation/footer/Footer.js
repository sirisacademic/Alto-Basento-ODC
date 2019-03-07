import React from 'react';
import {
  Container,
  Segment,
  Grid,
  Header,
  List,
  Image
} from 'semantic-ui-react';
import { 
  withLocalize,
  Translate 
} from 'react-localize-redux';
import { 
  Link 
} from 'react-router-dom';

const Footer = () => (
    <Segment inverted vertical style={{ padding: '5em 0em', marginTop: '4rem' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row columns={4}>
            <Grid.Column>
              <Header inverted as='h4'>
                <Translate id='footer.leftColumn'/>
              </Header>
              <Image src='./images/logo-siris.png' size='small' href='http://www.sirisacademic.com' target='_blank' />
            </Grid.Column>
            <Grid.Column>
              <Header inverted as='h4'>
                <Translate id='footer.middleColumn'/>
              </Header>
              <List link inverted>
                <List.Item as='a' href='http://www.areaprogrammabasento.it/' target='_blank'>
                    <Image src='./images/logo-areaprogrammabasento.png' size='small'/>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <Header inverted as='h4'>
                  <Translate id='footer.techColumn'/>
                </Header>
                <List link inverted>
                  <List.Item as='a' href='https://www.open-contracting.org/' target='_blank'>
                      <Image src='./images/logo-open-contracting.png' size='small'/>
                  </List.Item>      
                  <List.Item as='a' href='https://joinup.ec.europa.eu/solution/eprocurement-ontology/' target='_blank'>
                      <Image src='./images/eprocurement.png' size='mini' style={{marginLeft:'15px', marginRight:'15px'}}/>
                      <span>eProcurement Ontology</span>
                  </List.Item>            
                </List>
            </Grid.Column>
            
            <Grid.Column>
              <Header inverted as='h4'>
                <Translate id='footer.rightColumn'/>
              </Header>
              <List link inverted>
                <List.Item as={Link} to='/'>
                  <Translate id='header.home'/>
                </List.Item>
                <List.Item as={Link} to='/tenders'>
                  <Translate id='header.explore'/>
                </List.Item>
                <List.Item as={Link} to='/data'>
                  <Translate id='header.data'/>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
)

export default withLocalize(Footer);