import React, { Component } from 'react';
import { 
    Header, 
    Divider, 
    Grid, 
    Label,
    Container,
    Feed,
    Table,
    Icon,
    Statistic
} from 'semantic-ui-react';
import Utils from '../../Utils';
import * as d3 from 'd3';
import _ from 'lodash';
import Preloader from '../../presentation/preloader/Preloader';
import { 
    withLocalize,
    Translate 
} from 'react-localize-redux';
import { 
    Link 
} from 'react-router-dom';

class Tender extends Component {

    // get the tender by Id
    componentDidMount() {
        this.props.fetchTenderByID(this.props.tenderID);
    }

    render() {
        if(this.props.tenderID)
            return <Preloader/>

        let tender = this.props.tender,
            tenderDate =  new Date(tender.contractPeriod.startDate),
            parties = _([
                    {   name : tender.supplier.legalName,
                        percentage : _.find(tender.awardCriteriaDetails, ['name','Percentuale Ribasso']).value,
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
                <Table.Cell><Label color='teal' ribbon><Translate id='tender.table.winner'/></Label><strong>{p}</strong></Table.Cell> : 
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
                    <Translate id='tender.labels.id'/>
                    <Label.Detail>{tender.id}</Label.Detail>
                </Label>
                <Divider/>
                
                <Grid columns='2'>                    
                    <Grid.Column>                        
                        <Statistic>                            
                            <Statistic.Value>{Utils.formatCurrency(Math.round(tender.value.amount))}</Statistic.Value>
                        </Statistic>      
                        <Feed>
                            <Feed.Event>
                                <Feed.Label>
                                    <Icon name='building'/>
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Date>
                                        <Translate id='tender.labels.company'/>
                                    </Feed.Date>
                                    <Feed.Summary>
                                        <Link to={'/company/' + tender.supplier.legalName}>
                                            {tender.supplier.legalName }
                                        </Link> {
                                            ' - ' + 
                                            tender.supplier.address.municipality + 
                                            ', ' + tender.supplier.address.province + 
                                            ' (' + 
                                            tender.supplier.address.region + ' )'
                                            }
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>                            
                            <Feed.Event>
                                <Feed.Label>
                                    <Icon name='map marker alternate'/>
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Date>
                                        <Translate id='tender.labels.municipality'/>
                                    </Feed.Date>
                                    <Feed.Summary>
                                        {tender.municipality}
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                            <Feed.Event>
                                <Feed.Label>
                                    <Icon name='calendar outline'/>
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Date>
                                        <Translate id='tender.labels.date'/>
                                    </Feed.Date>
                                    <Feed.Summary>                                        
                                        {tenderDate.getDate() + 
                                        '/' + 
                                        tenderDate.getMonth() + 1 + 
                                        '/' + 
                                        tenderDate.getFullYear() + 
                                        ' (' + tender.contractPeriod.duration + ' days)'}
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>        
                        </Feed>                    
                    </Grid.Column>

                    <Grid.Column>
                        { 
                            tender.candidates.length > 1 && <Table celled>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell width={4}>
                                    <Translate id='tender.table.savingRate'/>
                                </Table.HeaderCell>
                                <Table.HeaderCell width={12}>
                                    <Translate id='tender.table.company'/>
                                </Table.HeaderCell>
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
                        }
                    </Grid.Column>                 
                </Grid>
            </Container>           
        );
    }
}

export default withLocalize(Tender);