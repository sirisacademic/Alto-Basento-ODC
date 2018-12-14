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

        if(tenders.length == 0)
            return <div></div>
        
        return (
            <Container>
                <Grid columns={2}>
                    <Grid.Column>
                        <VegaChart
                            data={stats.savingByCategory}
                            spec={specSavingByCategory}>
                        </VegaChart>
                    </Grid.Column>
                    <Grid.Column>
                        <VegaChart
                            data={stats.rankByAmount}
                            spec={specRankByAmount}>
                        </VegaChart>
                    </Grid.Column>
                </Grid>           
                <VegaChart
                    data={stats.orgsByMunicipality}
                    spec={specOrgsByMunicipality}>
                </VegaChart>
                <VegaChart
                    data={stats.tendersTimeline}
                    spec={specTendersTimeline}>
                </VegaChart>     
            </Container>
        );
    }
}

export default Charts;