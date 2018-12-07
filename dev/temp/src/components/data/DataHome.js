import React, { Component } from 'react';
import {
    Container, 
    Tab,
    Header,
    Segment,
    Grid
} from 'semantic-ui-react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';
import { 
    API_RESPONSE_ALL,
    API_RESPONSE_TENDER,
    API_RESPONSE_COMPANY
 } from './DataApiResponses.js';

class DataHome extends Component {
    
    render() {

        const panes = [
            {   menuItem: 'Overview', 
                render: () => 
                    <Tab.Pane basic attached={false}>
                        Explain the use of semantic web, we offer an ontology on top of the Open Contracting Standard Explain the endpoint, ontology documentation and so on. Explain the use of semantic web, we offer an ontology on top of the Open Contracting Standard Explain the endpoint, ontology documentation and so on
                    </Tab.Pane> 
            },
            {   menuItem: 'API',
                render: () => 
                    <Tab.Pane basic attached={false}>
                        <Header as='h3'>
                            Overview
                        </Header>
                        <p>
                            The API for Alto Basento is a publicly available interface to allow developers accessing the dataset containing all the registered tenders of the Centrale Unica di Committenza. The API is designed for developers, engineers, or anyone else who’s comfortable creating custom-coded solutions or integrating with RESTful APIs.
                        </p>
                        <Header as='h3'>
                            HTTP Methods
                        </Header>
                        <p>
                            The API is read-only, so only the GET HTTP method is supported in order to retrieve data. GET requests will never cause an update or change to the data.
                        </p>
                        <Header as='h3'>
                            Open Contracting Data Standard
                        </Header>
                        <p>
                            The response of the API follows the <a href='http://standard.open-contracting.org/latest/en/getting_started/' target='_blank'><strong>Open Contracting Data Standard</strong></a> (OCDS), which enables disclosure of data and documents at all stages of the contracting process by defining a common data model. It was created to support organizations to increase contracting transparency, and allow deeper analysis of contracting data by a wide range of users. 
                        </p>
                        <Header as='h3'>
                            Available Resources for Alto Basento API
                        </Header>
                        <Segment raised>
                            <Header as='h2'>
                                GET /tenders/all
                            </Header>
                            <p>
                                Returns all the available tenders. The response is a JSON array, containing a collection of tenders instances. The data structure of a Tender instance follows the definition of the <a href='http://standard.open-contracting.org/latest/en/schema/reference/#tender' target='_blank'>tender section's JSON schema.</a>
                            </p>
                            <Segment.Group>
                                <Segment>
                                    <strong>Resource URL</strong>
                                    <p>http://api.opendatabasento.com/all</p>
                                </Segment>
                                <Segment>
                                    <strong>Example request</strong>
                                    <p color='grey'><i>GET http://api.opendatabasento.com/all</i></p>
                                </Segment>
                                <Segment>
                                    <strong>Example response</strong>
                                    <SyntaxHighlighter language='javascript' style={docco}>{API_RESPONSE_ALL}</SyntaxHighlighter>
                                </Segment>
                            </Segment.Group>                            
                        </Segment>

                        <Segment raised>
                            <Header as='h2'>
                                {"GET /tender/{tender_id}"}
                            </Header>
                            <p>
                                Get information about a specific tender. The response is a JSON array, containing a tender instance. The data structure of a Tender instance follows the definition of the <a href='http://standard.open-contracting.org/latest/en/schema/reference/#tender' target='_blank'>tender section's JSON schema.</a>
                            </p>
                            <Segment.Group>
                                <Segment>
                                    <strong>Resource URL</strong>
                                    <p>{"http://api.opendatabasento.com/tender/{tender_id}"}</p>
                                </Segment>
                                <Segment>
                                    <strong>Path parameters</strong>
                                    <Grid columns={2}>
                                        <Grid.Column width={4} textAlign='left'><strong>tender_id</strong></Grid.Column>
                                        <Grid.Column textAlign='left'>The unique id of the tender</Grid.Column>
                                    </Grid>
                                </Segment>
                                <Segment>
                                    <strong>Example request</strong>
                                    <p color='grey'><i>GET http://api.opendatabasento.com/tender/6767364D6D</i></p>
                                </Segment>
                                <Segment>
                                    <strong>Example response</strong>
                                    <SyntaxHighlighter language='javascript' style={docco}>{API_RESPONSE_TENDER}</SyntaxHighlighter>
                                </Segment>
                            </Segment.Group>                            
                        </Segment>

                        <Segment raised>
                            <Header as='h2'>
                                {"GET /company/{company_id}"}
                            </Header>
                            <p>
                                Get information about a specific company. The response is a JSON array, containing a Company instance. The data structure of a Company instance follows the definition of the <a href='http://standard.open-contracting.org/latest/en/schema/reference/#tender' target='_blank'>tender section's JSON schema.</a>
                            </p>
                            <Segment.Group>
                                <Segment>
                                    <strong>Resource URL</strong>
                                    <p>{"http://api.opendatabasento.com/company/{company_id}"}</p>
                                </Segment>
                                <Segment>
                                    <strong>Path parameters</strong>
                                    <Grid columns={2}>
                                        <Grid.Column width={4} textAlign='left'><strong>company_id</strong></Grid.Column>
                                        <Grid.Column textAlign='left'>The unique id of the company</Grid.Column>
                                    </Grid>
                                </Segment>
                                <Segment>
                                    <strong>Example request</strong>
                                    <p color='grey'><i>GET http://localhost:8080/company/Autolinee%20Caivano</i></p>
                                </Segment>
                                <Segment>
                                    <strong>Example response</strong>
                                    <SyntaxHighlighter language='javascript' style={docco}>{API_RESPONSE_COMPANY}</SyntaxHighlighter>
                                </Segment>
                            </Segment.Group>                            
                        </Segment>
                        
                    </Tab.Pane> 
            },
            {   menuItem: 'SPARQL',
                render: () => 
                    <Tab.Pane basic attached={false}>
                        Tab 3 Content
                    </Tab.Pane> 
            },
        ];

        return (
            <Container className='main-container'>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Container>
        );
    }
}

export default DataHome;