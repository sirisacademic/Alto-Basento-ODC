import React, { Component } from 'react'
import VegaChart from './VegaChart';
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
        
        console.log('CHARTS: ');
        console.log(stats);

        return (
            <div>
                <VegaChart
                    data={stats.savingByCategory}
                    spec={specSavingByCategory}>
                </VegaChart>
                <VegaChart
                    data={stats.rankByAmount}
                    spec={specRankByAmount}>
                </VegaChart>
                <VegaChart
                    data={stats.orgsByMunicipality}
                    spec={specOrgsByMunicipality}>
                </VegaChart>
                <VegaChart
                    data={stats.tendersTimeline}
                    spec={specTendersTimeline}>
                </VegaChart>
            </div>            
        );
    }
}

export default Charts;