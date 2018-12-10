import React, { Component } from 'react';
import * as vega from 'vega';


class SavingByCategory extends Component {

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
        const { data } = this.props;
        const spec = this._spec();                
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

      // the vega spec for the chart
    _spec() {
        return {
            "$schema": "https://vega.github.io/schema/vega/v4.json",
            "width": 200,
            "height": 200,
            "padding": 5,
          
            "data": [
              {
                "name": "source",
                "values" : []
              }
            ],
          
            "scales": [
              {
                "name": "x",
                "type": "linear",
                "round": true,
                "nice": true,
                "zero": true,
                "domain": {"data": "source", "field": "average_ribasso"},
                "range": "width"
              },
              {
                "name": "y",
                "type": "linear",
                "round": true,
                "nice": true,
                "zero": true,
                "domain": {"data": "source", "field": "average_amount"},
                "range": "height"
              },
              {
                "name": "size",
                "type": "linear",
                "round": true,
                "nice": false,
                "zero": true,
                "domain": {"data": "source", "field": "sum_amount"},
                "range": [4,361]
              }
            ],
          
            "axes": [
              {
                "scale": "x",
                "grid": true,
                "domain": false,
                "orient": "bottom",
                "tickCount": 5,
                "title": "Average ribasaso"
              },
              {
                "scale": "y",
                "grid": true,
                "domain": false,
                "orient": "left",
                "titlePadding": 5,
                "title": "Average amount"
              }
            ],
          
            "marks": [
              {
                "name": "marks",
                "type": "symbol",
                "from": {"data": "source"},
                "encode": {
                  "update": {
                    "x": {"scale": "x", "field": "average_ribasso"},
                    "y": {"scale": "y", "field": "average_amount"},
                    "size": {"scale": "size", "field": "sum_amount"},
                    "shape": {"value": "circle"},
                    "strokeWidth": {"value": 2},
                    "opacity": {"value": 0.5},
                    "stroke": {"value": "#4682b4"},
                    "fill": {"value": "transparent"}
                  }
                }
              }
            ]
          }
    }
}

export default SavingByCategory;