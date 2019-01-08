import React, { Component } from 'react';
import { 
    Header, 
    Divider, 
    Grid, 
    Container,
    Feed,
    Statistic,
    Icon
} from 'semantic-ui-react';
import Utils from '../../Utils';
import TenderCards from '../TenderCards';
import Preloader from '../../presentation/preloader/Preloader';
import { 
    withLocalize,
    Translate 
} from 'react-localize-redux';

class Company extends Component {
        
    // get all the tenders
    componentDidMount() {
        this.props.fetchCompanyByID(this.props.companyID);
    }

    render() {
        if(this.props.companyID)
            return <Preloader/>

        let {tenders, org, stats} = this.props.company;

        return (
            <Container className='main-container'>
                <Header as='h1'>
                    {org.legalName}
                </Header>
                <Feed>
                    <Feed.Event>
                        <Feed.Label>
                            <Icon name='map marker alternate'/>
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Date>
                                <Translate id='company.labels.municipality'/>
                            </Feed.Date>
                            <Feed.Summary>
                                {org.address.municipality + 
                                ', ' + org.address.province + 
                                ' (' + 
                                org.address.region + ' )'}
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>                          
                </Feed>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Statistic>
                                <Statistic.Value>{stats.count}</Statistic.Value>
                                <Statistic.Label>
                                    <Translate id='company.stats.tenders'/>
                                </Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Statistic>
                                <Statistic.Value>{Utils.formatCurrency(Math.round(stats.sum))}</Statistic.Value>
                                <Statistic.Label>
                                    <Translate id='company.stats.spending'/>
                                </Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Statistic>
                                <Statistic.Value>{Math.round(stats.average)}%</Statistic.Value>
                                <Statistic.Label>
                                    <Translate id='company.stats.averageSaving'/>
                                </Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider/>
                <TenderCards tenders={tenders}></TenderCards>
            </Container>
        );
    }
}

export default withLocalize(Company);