import React, { Component } from 'react';
import * as d3 from 'd3';

class TenderDimensionBar extends Component {
    constructor(props) {
        super(props)
        this.margins = {
            top: 0,
            right: 25,
            bottom: 3,
            left: 0
        };
        this.createBar = this.createBar.bind(this);
        
    }

    componentDidMount() {
        this.createBar();
    }
    
    componentDidUpdate() {
        this.createBar();
    }

    createBar() {        
        var that = this;
        
        const maxX = 100;
        const node = this.node;
        const width = node.getBoundingClientRect().width;
        const xScale = d3.scaleLinear()
            .domain([0, maxX])
            .range([0, width - this.margins.right]);
        
        d3.select(node).selectAll('*').remove();

        d3.select(node)
            .on('click', function(d) {
                that.props.onClickTender({
                    category: that.props.category,
                    key : that.props.data.key
                });
            })
            .append('rect')
            .data([this.props.data.value])
            .style('fill', (this.props.data.selected)?
                'rgba(25, 42, 86, 0.8)' : '#F3795C'
            )
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', this.props.height - 1)
            .attr('width', d => xScale(d))
            .classed('selected', this.props.data.selected)
        d3.select(node)
            .append('text')
            .attr('alignment-baseline', 'middle')
            .attr('class', 'key')
            .text(this.props.data.key)
            .attr('x', 5)
            .attr('y', (this.props.height / 2) + 1)
            .classed('selected', this.props.data.selected);
        d3.select(node)
            .append('text')
            .attr('alignment-baseline', 'middle')
            .attr('class', 'value')
            .text(this.props.data.value)
            .attr('x', width)
            .attr('y', (this.props.height / 2))
            .classed('selected', this.props.data.selected);
        d3.select(node)
            .append('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', this.props.height)
            .attr('y2', this.props.height)
        
    }

    refCallback = node => {
        if(!node) return;
        
        this.node = node;
        // set the width of the svg once the element
        // is attached to the DOM and we are able to
        // measure its size
        d3.select(this.node)
            .attr('width', node.parentElement.getBoundingClientRect().width - 5);
    }

    render() {
        return (
            <div className='TenderDimensionBar'>
                <svg ref={this.refCallback} height={this.props.height}></svg>
            </div>
        );
    }
}

export default TenderDimensionBar