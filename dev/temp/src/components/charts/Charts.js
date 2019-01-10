import React, { Component } from 'react'
import VegaChart from './VegaChart';
import { 
    Grid, 
    Container, 
    Segment
  } from 'semantic-ui-react';
import {
    specSavingByCategory,
    specRankByAmount,
    specOrgsByMunicipality,
    specTendersTimeline,
    specFlowOrgMunicipality
} from './VegaSpecifications';
import { Constants } from '../../constants/constants';
import _ from 'lodash';
import { 
    withLocalize
} from 'react-localize-redux';
import FilterTagsContainer from '../../containers/FilterTagsContainer';

class Charts extends Component {

    render() {

        // get stats from the data
        let { tenders, stats, translate } = this.props;
                
        if(tenders.length === 0)
            return <div></div>
        console.log("specSavingByCategory, ", specSavingByCategory);
        // add locales to titles of the vega specifications
        _.find(specSavingByCategory.axes, ['scale', 'x'])
            .title = translate('charts.specSavingByCategory.axes.x.title');

        _.find(specSavingByCategory.axes, ['scale', 'y'])
            .title = translate('charts.specSavingByCategory.axes.y.title');

        _.find(specRankByAmount.axes, ['scale', 'x'])
            .title = translate('charts.specRankByAmount.axes.x.title');

        _.head(specOrgsByMunicipality.legends)
            .title = translate('charts.specOrgsByMunicipality.legend.title');    

        _.head(specTendersTimeline.legends)
            .title = translate('charts.specTendersTimeline.legend.title');    
        
        return (
            <Container>

                <Segment>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <VegaChart
                                    title={translate('charts.specOrgsByMunicipality.title')}
                                    data={stats.orgsByMunicipality}
                                    spec={specOrgsByMunicipality}>
                                </VegaChart>
                            </Grid.Column>
                            <Grid.Column>
                                    <VegaChart
                                        title={translate('charts.specTendersTimeline.title')}
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
                    <FilterTagsContainer/>
                </Segment>  

                <Segment>
                    <Grid columns={1}>
                        <Grid.Column>
                            <VegaChart
                                title={translate('charts.specFlowOrgMunicipality.title')}
                                data={stats.flowOrgMunicipality}
                                spec={specFlowOrgMunicipality}
                                height={1000}>
                            </VegaChart>    
                        </Grid.Column>
                    </Grid>     
                    <FilterTagsContainer/>      
                </Segment>

                <Segment>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <VegaChart
                                    title={translate('charts.specSavingByCategory.title')}
                                    data={stats.savingByCategory}
                                    spec={specSavingByCategory}>
                                </VegaChart>
                            </Grid.Column>
                            <Grid.Column>
                                <VegaChart
                                    title={translate('charts.specRankByAmount.title')}
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
                    <FilterTagsContainer/>
                </Segment>
                                        
            </Container>
        );
    }
}


export default withLocalize(Charts);