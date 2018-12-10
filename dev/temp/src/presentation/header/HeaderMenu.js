import React from 'react'
import {
  Container,
  Dropdown,
  Menu
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HeaderMenu = () => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as={Link} to='/' header>
          <span>Centrale Unica di Committenza</span>
          <span className='subheader'>dell’Area Programma Basento Bradano Camastra</span>
        </Menu.Item>
        <Menu.Item as={Link} to='/'>
            Home
        </Menu.Item>
        <Menu.Item as={Link} to='/tenders'>
            Explore
        </Menu.Item>
        <Menu.Item as={Link} to='/data'>
            The Data
        </Menu.Item>
      </Container>
    </Menu>    
  </div>
)

export default HeaderMenu