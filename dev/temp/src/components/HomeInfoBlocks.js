import React, { Component } from 'react';
import {
    Container,
    Button
} from 'semantic-ui-react';
import { 
    withLocalize,
    Translate 
} from 'react-localize-redux';

class HomeInfoBlocks extends Component {
    constructor(props) {        
        super(props);
        this.state = {
            marginTop: '4em',
            marginBottom: '5em'
        }
    };

    render() {
        return(
            <Container>
                <Container style={{ marginBottom: this.state.marginBottom, marginTop: this.state.marginTop }}>
                    <h2>
                        <Translate id='home.introContent.openGov.title'/>
                    </h2>
                    <p>
                        <Translate id='home.introContent.openGov.content'/>
                    </p>
                    <Button content='Info' icon='plus' labelPosition='left' size='small'/>
                </Container>
                <Container style={{ marginBottom: this.state.marginBottom }}>
                    <h2>
                        <Translate id='home.introContent.semanticWeb.title'/>
                    </h2>
                    <p>
                        <Translate id='home.introContent.semanticWeb.content'/>
                    </p>
                    <Button content='Info' icon='plus' labelPosition='left' size='small'/>
                </Container>
                <Container style={{ marginBottom: this.state.marginBottom }}>
                    <h2>
                        <Translate id='home.introContent.api.title'/>
                    </h2>
                    <p>
                        <Translate id='home.introContent.api.content'/>
                    </p>
                    <Button content='Info' icon='plus' labelPosition='left' size='small'/>
                </Container> 
            </Container>                       
        )
    }
}

export default withLocalize(HomeInfoBlocks);