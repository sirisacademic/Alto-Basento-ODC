import React, { Component } from 'react'
import VegaChart from './VegaChart';
import { 
    Grid, Container, Segment
  } from 'semantic-ui-react';
import {
    specSavingByCategory,
    specRankByAmount,
    specOrgsByMunicipality,
    specTendersTimeline,
    specFlowOrgMunicipality
} from './VegaSpecifications';
import { Constants } from '../../constants/constants';
import { withRouter} from 'react-router-dom';

class Charts extends Component {

    render() {

        // get stats from the data
        let { tenders, stats } = this.props;

        if(tenders.length === 0)
            return <div></div>
        
        return (
            <Container>
                <Segment>
                        <VegaChart
                            title='Flows Organizations and municipalities'
                            data={stats.flowOrgMunicipality}
                            spec={specFlowOrgMunicipality}
                            height={1000}>
                        </VegaChart>               
                </Segment>
                <Segment>
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
                                    spec={specRankByAmount}
                                    clickListener={(event, item) => {
                                        if(item && item.datum)
                                            this.props.history.push('/company/' + item.datum[Constants.NOME_IMPRESA]);
                                    }}
                                    hoverListener={(event, item) => {
                                        if(item && item.datum)
                                            console.log("hover: ", item);
                                    }}>                                
                                </VegaChart>
                            </Grid.Column>
                        </Grid.Row>       
                    </Grid>
                </Segment>
                <Segment>
                    <Grid columns={2}>
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
                                        spec={specTendersTimeline}
                                        clickListener={(event, item) => {
                                            if(item && item.datum)
                                                this.props.history.push('/tender/' + item.datum.tenderId);
                                        }}>
                                    </VegaChart>     
                            </Grid.Column>
                        </Grid.Row>             
                    </Grid> 
                </Segment>                          
            </Container>
        );
    }
}


export default withRouter(Charts);