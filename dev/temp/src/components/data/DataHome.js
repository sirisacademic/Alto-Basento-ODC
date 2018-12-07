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

class DataHome extends Component {
    
    render() {
        let responseExample = `[{
            id: "6767364D6D",
            description: "Gestione del servizio di trasporto pubblico locale",
            status: "nessun contenzionso",
            organizationReference: {
                legalName: "Autolinee Caivano",
                address: {
                    region: "Basilicata",
                    province: "Potenza",
                    municipality: "Picerno",
                    countryName: "Italy"
                },
                categories: [{
                    code: "17.8",
                    name: "17.8"
                }]
            },
            value: {
                amount: 251830,
                currency: "EUR"
            },
            procurementMethod: "Services",
            mainProcurementCategory: {
                code: "17.8",
                name: "17.8",
                cost: {
                    amount: 251830,
                    currency: "EUR"
                }
            },
            additionalProcurementCategories: [],
            contractPeriod: {
                startDate: "2016-01-20T00:09Z",
                endDate: null,
                maximumExtent: null,
                duration: 730
            },
            candidates: [{
                name: ""
            }],
            municipality: "Picerno",
            tipoIntervento: "Acquisto",
            percentageRibasso: "0.7"
        },
        {
            id: "66246019AD",
            description: "Servizio di refezione scolastica ",
            status: "nessun contenzionso",
            organizationReference: {
                legalName: "P&C Consorzio Stabile arl",
                address: {
                    region: "Basilicata",
                    province: "Potenza",
                    municipality: "Potenza",
                    countryName: "Italy"
                },
                categories: [{
                    code: "17.5",
                    name: "17.5"
                }]
            },
            value: {
                amount: 90856,
                currency: "EUR"
            },
            procurementMethod: "Services",
            mainProcurementCategory: {
                code: "17.5",
                name: "17.5",
                cost: {
                    amount: 90856,
                    currency: "EUR"
                }
            },
            additionalProcurementCategories: [],
            contractPeriod: {
                startDate: "2016-01-28T00:09Z",
                endDate: null,
                maximumExtent: null,
                duration: 365
            },
            candidates: [{
                name: ""
            }],
            municipality: "Pietragalla",
            tipoIntervento: "Acquisto",
            percentageRibasso: "0.9886"
        },
        {
            id: "6662445789",
            description: "Ristrutturazione ed adeguamento tecnologico della palestra dell istituto comprensivo "
            G.Faggella "",
            status: "nessun contenzionso",
            organizationReference: {
                legalName: "Pepice Nicola",
                address: {
                    region: "Basilicata",
                    province: "Potenza",
                    municipality: "Picerno",
                    countryName: "Italy"
                },
                categories: [{
                        code: "OG1",
                        name: "Edifici civili e industriali"
                    },
                    {
                        code: "OG10",
                        name: "Impianti per la trasformazione alta/media tensione e per la distribuzione di energia elettrica in corrente alternata e continua ed impianti di pubblica illuminazione"
                    },
                    {
                        code: "OG11",
                        name: "Impianti tecnologici"
                    }
                ]
            },
            value: {
                amount: 119040,
                currency: "EUR"
            },
            procurementMethod: "Works",
            mainProcurementCategory: {
                code: "OG1",
                name: "Edifici civili e industriali",
                cost: {
                    amount: 119040,
                    currency: "EUR"
                }
            },
            additionalProcurementCategories: [],
            contractPeriod: {
                startDate: "2016-01-18T00:05Z",
                endDate: null,
                maximumExtent: null,
                duration: 120
            },
            candidates: [{
                    name: "C.A. Costruzioni srl",
                    percentage: 25.1
                },
                {
                    name: "C.M. Impianti srl",
                    percentage: 31.14
                },
                {
                    name: "Edil Geo Grieco sas di Grieco Claudio & C.",
                    percentage: 28.47
                },
                {
                    name: "Laganaro srl",
                    percentage: 27.59
                },
                {
                    name: "Rinaldi Tommaso",
                    percentage: 15.95
                },
                {
                    name: "Sabato Tommaso",
                    percentage: 14.16
                },
                {
                    name: "Sabia Leonardo & C. s.a.s.",
                    percentage: 32.34
                }
            ],
            municipality: "San Fele",
            tipoIntervento: "Ristrutturazione",
            percentageRibasso: "38.155"
        },
        {
            id: "702481658C",
            description: "Lavori di edilizia scolastica per la demolizione della scuola materna in località Cappelluccia con ricostruzione della stessa",
            status: "nessun contezioso",
            organizationReference: {
                legalName: "F.lli Martoccia",
                address: {
                    region: "Basilicata",
                    province: "Potenza",
                    municipality: "Anzi",
                    countryName: "Italy"
                },
                categories: [{
                        code: "OG1",
                        name: "Acquedotti, gasdotti, oleodotti, opere di irrigazione e di evacuazione"
                    },
                    {
                        code: "OG3",
                        name: "Edifici civili e industriali"
                    },
                    {
                        code: "OG6",
                        name: "Opere fluviali, di difesa, di sistemazione idraulica e di bonifica"
                    },
                    {
                        code: "OG8",
                        name: "Strade, autostrade, ponti, viadotti, ferrovie, metropolitane"
                    }
                ]
            },
            value: {
                amount: 213877,
                currency: "EUR"
            },
            procurementMethod: "Works",
            mainProcurementCategory: {
                code: "OG1",
                name: "Edifici civili e industriali",
                cost: {
                    amount: 153133,
                    currency: "EUR"
                }
            },
            additionalProcurementCategories: [{
                    code: "OS28",
                    name: "Impianti interni elettrici, telefonici, radiotelefonici e televisivi",
                    cost: {
                        amount: 153133,
                        currency: "EUR"
                    }
                },
                {
                    code: "OS30",
                    name: "Impianti termici e di condizionamento",
                    cost: {
                        amount: 153133,
                        currency: "EUR"
                    }
                }
            ],
            contractPeriod: {
                startDate: "2017-01-03T00:05Z",
                endDate: null,
                maximumExtent: null,
                duration: 180
            },
            candidates: [{
                    name: "Bandino Carmela",
                    percentage: 28.27
                },
                {
                    name: "ELT Costruzioni srl",
                    percentage: 20.537
                },
                {
                    name: "M.P. srl",
                    percentage: 27.501
                },
                {
                    name: "N Invest srl",
                    percentage: 28.864
                },
                {
                    name: "Pansardi Antonio",
                    percentage: 20.05
                },
                {
                    name: "Santoro Impianti",
                    percentage: 19.55
                },
                {
                    name: "Summa srl",
                    percentage: 23.71
                },
                {
                    name: "Tecnoc srl",
                    percentage: 27.171
                }
            ],
            municipality: "Pietragalla",
            tipoIntervento: "Costruzione",
            percentageRibasso: "29.631"
        }
    ]`;

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
                                    <SyntaxHighlighter language='javascript' style={docco}>{responseExample}</SyntaxHighlighter>
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
                                    <SyntaxHighlighter language='javascript' style={docco}>{responseExample}</SyntaxHighlighter>
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
                                    <SyntaxHighlighter language='javascript' style={docco}>{responseExample}</SyntaxHighlighter>
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