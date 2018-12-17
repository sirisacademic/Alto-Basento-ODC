import React, { Component } from 'react'
import VegaChart from './VegaChart';
import { 
    Grid, Container
  } from 'semantic-ui-react';
import {
    specSavingByCategory,
    specRankByAmount,
    specOrgsByMunicipality,
    specTendersTimeline
} from './VegaSpecifications';

class Charts extends Component {

    render() {

        // get stats from the data
        let { tenders, stats } = this.props;

        if(tenders.length === 0)
            return <div></div>
        
        return (
            <Container>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <VegaChart
                                title='Percentage of saving per category'
                                data={stats.savingByCategory}
                                spec={specSavingByCategory}>
                            </VegaChart>
                        </Grid.Column>
                        <Grid.Column>
                            <VegaChart
                                title='Rank by total amount'
                                data={stats.rankByAmount}
                                spec={specRankByAmount}>
                            </VegaChart>
                        </Grid.Column>
                    </Grid.Row>       
                    <Grid.Row>
                    <Grid.Column>
                        <VegaChart
                            title='Geographical origin of the companies'
                            data={stats.orgsByMunicipality}
                            spec={specOrgsByMunicipality}>
                        </VegaChart>
                    </Grid.Column>
                    <Grid.Column>
                            <VegaChart
                                title='Timeline of tenders'
                                data={stats.tendersTimeline}
                                spec={specTendersTimeline}>
                            </VegaChart>     
                    </Grid.Column>
                    </Grid.Row>             
                </Grid>                           
            </Container>
        );
    }
}

export default Charts;