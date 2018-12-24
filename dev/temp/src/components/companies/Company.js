import React, { Component } from 'react';
import { 
    Header, 
    Divider, 
    Grid, 
    Container,
    Feed,
    Statistic
} from 'semantic-ui-react';
import Utils from '../../Utils';
import TenderCards from '../TenderCards';
import Preloader from '../../presentation/preloader/Preloader';


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
                    <Feed.Event 
                        icon='map marker alternate' 
                        date='Municipality:' 
                        summary={
                            org.address.municipality + 
                            ', ' + org.address.province + 
                            ' (' + 
                            org.address.region + ' )'} />
                </Feed>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Statistic>
                                <Statistic.Value>{stats.count}</Statistic.Value>
                                <Statistic.Label>public tenders</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Statistic>
                                <Statistic.Value>{Utils.formatCurrency(Math.round(stats.sum))}</Statistic.Value>
                                <Statistic.Label>total amount</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Statistic>
                                <Statistic.Value>{Math.round(stats.average)}%</Statistic.Value>
                                <Statistic.Label>Average of tender saving</Statistic.Label>
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

export default Company;