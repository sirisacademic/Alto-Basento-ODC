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
        const xScale = d3.scaleLinear()
            .domain([0, maxX])
            .range([0, this.props.size[0] - this.margins.right]);
        
        d3.select(node).selectAll('*').remove();

        d3.select(node)
            .on('click', function(d) {
                that.props.onclick({
                    category: that.props.category,
                    key : that.props.data.key
                });
            })
            .append('rect')
            .data([this.props.data.value])
            .style('fill', '#fe9922')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', this.props.size[1])
            .attr('width', d => xScale(d))
        d3.select(node)
            .append('text')
            .attr('alignment-baseline', 'middle')
            .attr('class', 'key')
            .text(this.props.data.key)
            .attr('x', 5)
            .attr('y', (this.props.size[1] / 2));
        d3.select(node)
            .append('text')
            .attr('alignment-baseline', 'middle')
            .attr('class', 'value')
            .text(this.props.data.value)
            .attr('x', this.props.size[0])
            .attr('y', (this.props.size[1] / 2));
        d3.select(node)
            .append('line')
            .attr('x1', 0)
            .attr('x2', this.props.size[0])
            .attr('y1', this.props.size[1] - 2)
            .attr('y2', this.props.size[1] - 2)
        
    }

    render() {
        return (
            <div className='TenderDimensionBar'>
                <svg ref={node => this.node = node} width={500} height={this.props.size[1]}></svg>
            </div>
        );
    }
}

export default TenderDimensionBar