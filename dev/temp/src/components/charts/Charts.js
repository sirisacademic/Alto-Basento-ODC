import React, { Component } from 'react'
import SavingByCategory from './SavingByCategory';

class Charts extends Component {

    render() {

        // get stats from the data
        let { tenders, stats } = this.props;

        if(tenders.length == 0)
            return <div></div>
        
        console.log('CHARTS: ');
        console.log(stats);

        return (
            <SavingByCategory data={stats.savingByCategory}></SavingByCategory>
        );
    }
}

export default Charts;