import React, { Component } from 'react';
import { 
    Header, 
    Divider, 
    Grid, 
    Label,
    Container,
    Feed,
    Table,
    Icon
} from 'semantic-ui-react';

import * as d3 from 'd3';
import _ from 'lodash';


class Tender extends Component {

    // get all the tenders
    componentDidMount() {
        this.props.fetchTenderByID(this.props.tenderID);
    }

    render() {
        if(this.props.tenderID)
            return <div>Loading...</div>

        let tender = this.props.tender,
            tenderDate =  new Date(tender.contractPeriod.startDate),
            parties = _([
                    {   name : tender.organizationReference.legalName,
                        percentage : tender.percentageRibasso,
                        winner: true
                    },
                    ...tender.candidates
                ])
                .sortBy('percentage')
                .reverse()
                .value();
        
        // color scale by saving percentage
        var colorScale = d3.scaleLinear()
            .range(['#d8eae0', '#7decaf'])            
            .domain(d3.extent(parties, p => p.percentage))
            .interpolate(d3.interpolateRgb);

        // render the cell based on 
        // candidate status
        let cellRendererCost = (party) => {
            var p = d3.format(".0%")(party.percentage/100); 
            return (party.winner)?
                <Table.Cell><Label color='teal' ribbon>Winner</Label><strong>{p}</strong></Table.Cell> : 
                <Table.Cell>{p}</Table.Cell>
        };
        let cellRendererName = (party) => (
            (party.winner)?
                <Table.Cell><strong>{party.name}</strong></Table.Cell> : 
                <Table.Cell>{party.name}</Table.Cell>
        );

        return (
            <Container className='main-container'>
                <Header as='h1'>
                    {tender.description}
                </Header>
                <Label as='a' color='grey' image>
                    Identifier
                    <Label.Detail>{tender.id}</Label.Detail>
                </Label>
                <Divider/>
                
                <Grid columns='2'>                    
                    <Grid.Column>                        
                        <p style={{ fontSize: '4em', fontWeight: '300', marginBottom:'0'}}>
                            {d3.format("$,")(tender.value.amount)}
                        </p>        
                        <Feed>
                            <Feed.Event>
                                <Feed.Label>
                                    <Icon name='building'/>
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Date>
                                        Awarded company:
                                    </Feed.Date>
                                    <Feed.Summary>
                                        <a href={'/company/' + tender.organizationReference.legalName}>
                                            {tender.organizationReference.legalName }
                                        </a> {
                                            ' - ' + 
                                            tender.organizationReference.address.municipality + 
                                            ',' + tender.organizationReference.address.province + 
                                            ' (' + 
                                            tender.organizationReference.address.region + ' )'
                                            }
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>                            
                            <Feed.Event 
                                icon='map marker alternate' 
                                date='Tender municipality:' 
                                summary={tender.municipality} />
                            <Feed.Event 
                                icon='calendar outline' 
                                date='Starting date:' 
                                summary={
                                    tenderDate.getDate() + 
                                    '/' + 
                                    tenderDate.getMonth() + 1 + 
                                    '/' + 
                                    tenderDate.getFullYear() + 
                                    ' (' + tender.contractPeriod.duration + ' days)'} />
                        </Feed>
                    </Grid.Column>

                    <Grid.Column>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell width={4}>Saving Rate</Table.HeaderCell>
                                <Table.HeaderCell width={12}>Company</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    parties.map(
                                        (d, index) => 
                                        <Table.Row
                                            key={index}
                                            style={{ backgroundColor: colorScale(d.percentage) }}>
                                            {cellRendererCost(d)}                                            
                                            {cellRendererName(d)}
                                        </Table.Row>
                                    )
                                }
                            </Table.Body>
                        </Table>
                    </Grid.Column>                 
                </Grid>
            </Container>           
        );
    }
}

export default Tender;