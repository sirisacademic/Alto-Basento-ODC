import React, { Component } from 'react';
import {
    Container, 
    Tab,
    Header,
    Segment,
    Grid,
    Button
} from 'semantic-ui-react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';
import { 
    API_RESPONSE_ALL,
    API_RESPONSE_TENDER,
    API_RESPONSE_COMPANY
 } from './DataApiResponses.js';
import Iframe from 'react-iframe';
import { 
    withLocalize,
    Translate 
} from 'react-localize-redux';

class DataHome extends Component {

    render() {

        const panes = [
            {   menuItem: 'Overview', 
                render: () => 
                    <Tab.Pane basic attached={false}>
                        <p><Translate id="data.overview1"/></p>
                        <Header as='h5'>API</Header>
                        <p><Translate id="data.overview2"/></p>
                        <p><Translate id="data.overview3"/></p>
                        <Header as='h5'>SPARQL endpoint</Header>
                        <p><Translate id='data.overview4'/></p>
                    </Tab.Pane> 
            },
            {   menuItem: 'API',
                render: () => 
                    <Tab.Pane basic attached={false}>
                        <Header as='h3'>
                            <Translate id='data.api.overview.title'/>
                        </Header>
                        <p>
                        <Translate id='data.api.overview.content'/>
                        </p>
                        <Header as='h3'>
                            <Translate id='data.api.httpMethods.title'/>
                        </Header>
                        <p>
                            <Translate id='data.api.httpMethods.content'/>
                        </p>
                        <Header as='h3'>
                            <Translate id='data.api.OCDS.title'/>
                        </Header>
                        <p>
                            <Translate id='data.api.OCDS.content'/>
                        </p>
                        <Header as='h3'>
                            <Translate id='data.api.resources.title'/>
                        </Header>
                        <Segment raised>
                            <Header as='h2'>
                                GET /tenders/all
                            </Header>
                            <p>
                                <Translate id='data.api.resources.all'/>
                            </p>
                            <Segment.Group>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.resourceURL'/></strong>
                                    <p>http://api.opendatabasento.com/all</p>
                                </Segment>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.exampleRequest'/></strong>
                                    <p color='grey'><i>GET http://api.opendatabasento.com/all</i></p>
                                </Segment>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.exampleResponse'/></strong>
                                    <SyntaxHighlighter language='javascript' style={docco}>{API_RESPONSE_ALL}</SyntaxHighlighter>
                                </Segment>
                            </Segment.Group>                            
                        </Segment>

                        <Segment raised>
                            <Header as='h2'>
                                {"GET /tender/{tender_id}"}
                            </Header>
                            <p>
                                <Translate id='data.api.resources.tender'/>
                            </p>
                            <Segment.Group>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.resourceURL'/></strong>
                                    <p>{"http://api.opendatabasento.com/tender/{tender_id}"}</p>
                                </Segment>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.pathParams'/></strong>
                                    <Grid columns={2}>
                                        <Grid.Column width={4} textAlign='left'><strong>tender_id</strong></Grid.Column>
                                        <Grid.Column textAlign='left'><Translate id='data.api.resources.labels.tender'/></Grid.Column>
                                    </Grid>
                                </Segment>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.exampleRequest'/></strong>
                                    <p color='grey'><i>GET http://api.opendatabasento.com/tender/6767364D6D</i></p>
                                </Segment>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.exampleResponse'/></strong>
                                    <SyntaxHighlighter language='javascript' style={docco}>{API_RESPONSE_TENDER}</SyntaxHighlighter>
                                </Segment>
                            </Segment.Group>                            
                        </Segment>

                        <Segment raised>
                            <Header as='h2'>
                                {"GET /company/{company_id}"}
                            </Header>
                            <p>
                                <Translate id='data.api.resources.company'/>
                            </p>
                            <Segment.Group>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.resourceURL'/></strong>
                                    <p>{"http://api.opendatabasento.com/company/{company_id}"}</p>
                                </Segment>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.pathParams'/></strong>
                                    <Grid columns={2}>
                                        <Grid.Column width={4} textAlign='left'><strong>company_id</strong></Grid.Column>
                                        <Grid.Column textAlign='left'><Translate id='data.api.resources.labels.company'/></Grid.Column>
                                    </Grid>
                                </Segment>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.exampleRequest'/></strong>
                                    <p color='grey'><i>GET http://localhost:8080/company/Autolinee%20Caivano</i></p>
                                </Segment>
                                <Segment>
                                    <strong><Translate id='data.api.resources.labels.exampleResponse'/></strong>
                                    <SyntaxHighlighter language='javascript' style={docco}>{API_RESPONSE_COMPANY}</SyntaxHighlighter>
                                </Segment>
                            </Segment.Group>                            
                        </Segment>
                        
                    </Tab.Pane> 
            },
            {   menuItem: 'SPARQL',
                render: () => 
                    <Tab.Pane basic attached={false} style={{height: '200vh'}}>
                        <p><Translate id='data.sparql.intro'/></p>
                        <Button target="_blank" href="https://s3-eu-west-1.amazonaws.com/openbasento-ontology/doc/index.html">Ontology Documentation</Button>
                        <Segment style={{height: '200vh'}}>
                            <Iframe url="http://sirislab.com/lab/cuc/endpoint/index.html"
                                width="98%"
                                height="100%"/>
                        </Segment>
                    </Tab.Pane> 
            },
        ];

        return (
            <Container className='main-container' style={{paddingTop: '2em'}}>
                <Tab menu={{ secondary: true, pointing: true }} 
                    panes={panes} />
            </Container>
        );
    }
}

export default withLocalize(DataHome);