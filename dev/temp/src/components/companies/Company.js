import React, { Component } from 'react';
import { 
    Header, 
    Divider, 
    Grid, 
    Label,
    Container,
    Feed,
    Table
} from 'semantic-ui-react';
import Utils from '../../Utils';
import * as d3 from 'd3';
import _ from 'lodash';


class Company extends Component {
        
    // get all the tenders
    componentDidMount() {
        this.props.fetchCompanyByID(this.props.companyID);
    }

    render() {
        if(this.props.companyID)
            return <div>Loading...</div>

        let {tender, org, stats} = this.props.company;

        return (
            <Container className='main-container'>
                <Header as='h1'>
                    {org.legalName}
                </Header>
                <Divider/>
                <Grid className='figures' columns={3} divided>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <h1 className='figure'>{stats.count}</h1>
                            <p>public tenders</p>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <h1 className='figure'> {Utils.formatCurrency(Math.round(stats.sum))}</h1>
                            <p>totala amount</p>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <h1 className='figure'>{stats.average}</h1>
                            <p>Average of tender saving</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Company;