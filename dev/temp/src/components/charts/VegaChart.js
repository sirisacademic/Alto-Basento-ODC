import React, { Component } from 'react';
import * as vega from 'vega';


class VegaChartSavingByCategory extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderVega();
    }

    componentDidUpdate() {
        this.renderVega();
    }

    renderVega() {
        const { data, spec } = this.props;
        spec.data[0].values = data;

        return new vega.View(vega.parse(spec))
            .renderer('svg')
            .initialize(this.chart)
            .run();

    }

    // dummy render method that creates the container vega draws inside
    render() {
        return (
            <div ref={(c) => { this.chart = c; }}> </div> 
        );
    }
}

export default VegaChartSavingByCategory;