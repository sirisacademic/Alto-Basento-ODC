import React, { Component } from 'react';
import TenderDimensionBar from './TenderDimensionBar';

class TenderDimensionBars extends Component {
    constructor(props) {
        super(props)
        this.margins = {
            top: 0,
            right: 25,
            bottom: 3,
            left: 0
        };
    }


    render() {
        const data = this.props.data.sort((a, b) => (b.value - a.value));
        return (
            <div className='TenderDimensionBars'>
                {
                    data.map(
                        (d, index) => <TenderDimensionBar category={this.props.category} key={index} data={d} size={[200, 25]} onclick={this.props.onclick}></TenderDimensionBar>
                    )
                }
            </div>
        );
    }
}

export default TenderDimensionBars