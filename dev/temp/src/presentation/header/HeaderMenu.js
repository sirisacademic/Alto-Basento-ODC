import React from 'react'
import {
  Container,
  Menu,
  Flag
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { 
  Translate,
  withLocalize
} from 'react-localize-redux';

class HeaderMenu extends React.Component { 
  constructor(props) {
    super(props);    
    this.onClick = this.onClick.bind(this);
  }

  onClick(lang) {
    this.props.setActiveLanguage(lang)
  }

  render() {
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as={Link} to='/' header>
              <span>Centrale Unica di Committenza</span>
              <span className='subheader'>dell’Area Programma Basento Bradano Camastra</span>
            </Menu.Item>
            <Menu.Item as={Link} to='/'>
              <Translate id='header.home'/>
            </Menu.Item>
            <Menu.Item as={Link} to='/tenders'>
              <Translate id='header.explore'/>
            </Menu.Item>
            <Menu.Item as={Link} to='/data'>
              <Translate id='header.data'/>
            </Menu.Item>
            <Menu.Menu position='right'>
            {
              this.props.languages.map( lang =>
                <Menu.Item 
                  active={this.props.activeLanguage.code === lang.code}
                  key={lang.code} 
                  onClick={(e) => this.onClick(lang.code)}>
                  <Flag name={(lang.code=='it')? lang.code : 'uk'}/>
                  {lang.code }
                </Menu.Item>
              )
            }
            </Menu.Menu>
          </Container>
        </Menu>    
      </div>
    )
  }
}  

export default withLocalize(HeaderMenu);