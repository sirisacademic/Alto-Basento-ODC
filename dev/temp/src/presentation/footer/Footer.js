
import React from 'react'
import {
  Container,
  Segment,
  Grid,
  Header,
  List,
  Image
} from 'semantic-ui-react'

const Footer = () => (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Header inverted as='h4' content='Developed by:' />
              <Image src='./images/logo-siris.png' size='small'/>
            </Grid.Column>
            <Grid.Column>
              <Header inverted as='h4' content='With the support of:' />
              <List link inverted>
                <List.Item as='a' href='http://www.areaprogrammabasento.it/' target='_blank'>
                    <Image src='./images/logo-areaprogrammabasento.png' size='small'/>
                </List.Item>
                <List.Item as='a' href='https://www.open-contracting.org/' target='_blank'>
                    <Image src='./images/logo-open-contracting.png' size='small'/>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
)

export default Footer