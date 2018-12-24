import React, { Component } from 'react';
import * as vega from 'vega';
var vegaTooltip = require('vega-tooltip/build/vega-tooltip');


class VegaChartSavingByCategory extends Component {

    componentDidMount() {
        this.renderVega();
    }

    componentDidUpdate() {
        this.renderVega();
    }

    renderVega() {
        const { data, spec, clickListener, height } = this.props;
        
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
        spec.autosize = 'fit';
        spec.height = height || 400;
        spec.padding = {
            top: 20,
            left: 0,
            right: 0,
            bottom: 20
        };
        
        // create the Vega view
        let view = new vega.View(vega.parse(spec))
                .renderer('svg')
                .tooltip(
                    (new vegaTooltip.Handler({theme: 'dark'})).call
                )
                .initialize(this.node);
        
        // add interactions, if any
        if(clickListener)
            view.addEventListener('click', clickListener);
        
        // run the view
        view.run();
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