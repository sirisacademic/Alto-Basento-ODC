import React, { Component } from 'react';
import * as vega from 'vega';


class VegaChartSavingByCategory extends Component {

    componentDidMount() {
        this.renderVega();
    }

    componentDidUpdate() {
        this.renderVega();
    }

    renderVega() {
        const { data, spec } = this.props;
        
        // inject some dynamic settings to
        // the vega specification 
        spec.data[0].values = data;
        spec.title = {
            text : this.props.title,
            fontSize : 16,
            fontWeight: 'bold',
            offset: 20
        }
        // vega specs have its 'autosize' property to 'fit' (automatically adjust
        // the layout in an attempt to force the total visualization size to fit
        // within the given width, height and padding values).
        // When we have a restricted with, this is the property more suitable
        spec.width = this.node.getBoundingClientRect().width;
        spec.height = 400;
        spec.padding = {
            top: 60,
            left: 50,
            right: 50,
            bottom: 10
        };
        
        new vega.View(vega.parse(spec))
            .renderer('svg')
            .initialize(this.node)
            .run();
    }

    refCallback = node => {
        this.node = node;
    }

    // dummy render method that creates the container vega draws inside
    render() {
        return (
            <div ref={this.refCallback}> </div> 
        );
    }
}

export default VegaChartSavingByCategory;