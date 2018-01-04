/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_chart.scss';
import * as actions from '../../actions/page';

import ToggleDegreeBtn from './ToggleDegreeBtn';
import Spinner from './Spinner';

const AXIS_STROKE = 1,
      HEIGHT = 450,
      WIDTH = 600,
      PADDING = 15,
      RADIUS = 5;

function toFahr(cels) {
    return ~~(cels * (9/5) + 32);
}

class Chart extends Component {
    // componentWillReceiveProps(nextProps) {
    //     console.log(JSON.stringify(this.props.w));
    //     console.log(JSON.stringify(nextProps.w));
    //     if (this.props.degree != nextProps.degree ||
    //         JSON.stringify(this.props.w) != JSON.stringify(nextProps.w)) {
    //         this.loadChart();
    //     }
    // }

    loadChart() {
        const { w, degree } = this.props;

        if (Object.keys(w).length < 1) return;
        d3.selectAll('.chart > *').remove();

        let days = w.query.results.channel.item.forecast.map((obj) => obj.day);
        let degrees = w.query.results.channel.item.forecast.map((obj) => ~~((+obj.high + +obj.low)/2));
        
        if (degree == 'f') {
            degrees = degrees.map((cels) => toFahr(cels));
        }

        let container = d3.select('.chart');

        let y = d3.scaleLinear()
            .domain(d3.extent(degrees))
            .range([HEIGHT - PADDING*3.5, PADDING] );
        
        let yAxis = d3.axisRight(y)
            .tickPadding(10);

        let x = d3.scaleLinear()
            .domain([0, degrees.length])
            .range([PADDING*3.5, WIDTH - PADDING]);

        console.log(WIDTH)
        let xAxis = d3.axisTop(x);  
        
        container.append('g') // degrees
            .classed('y-axis', true)
            .call(yAxis)
            .selectAll('line, path')
              .remove();

        container.append('g') //days
            .attr("transform", `translate(0,${HEIGHT - PADDING})`)
            .classed('x-axis', true)
            .call(xAxis)
            .selectAll('line, path')
              .remove();

        d3.selectAll('.x-axis text')
              .text((d, i) => days[i])

        let coords = [];

        container
            .selectAll('circle')
            .data(degrees)
            .enter()
            .append('circle')
            .attr('transform', (d, i) => { coords.push([x(i), y(d)]); return `translate(${x(i)}, ${y(d)})`})
            .attr('r', RADIUS)
            .attr('fill', '#333');

        container
            .selectAll('line')
            .data(Array.from(Array(degrees.length-1).keys()))
            .enter()
            .append('line')
            .attr('x1', (d, i) => coords[i][0])
            .attr('y1', (d, i) => coords[i][1])
            .attr('x2', (d, i) => coords[i+1][0])
            .attr('y2', (d, i) => coords[i+1][1])
            .style('stroke', '#333')
            .style('stroke-width', 1);


    }


    componentDidUpdate() {
        if (!this.fetching) this.loadChart();
    }

    componentDidMount() {
        if (Object.keys(this.props.w).length > 0 ) this.loadChart;
    }
    
    render() {
        const { degree, fetching } = this.props;
        const { toggleDegree } = this.props.actions;


        return(
            <div className="chart--wrapper">
                { fetching ?     
                    (<Spinner />) :    
                    (<div ref={el => this.cont = el} className="chart--container">
                        <ToggleDegreeBtn degree={degree} onClick={toggleDegree} />
                        <svg width={WIDTH} height={HEIGHT} className="chart"></svg>
                    </div>)
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      w: state.w,
      degree: state.degree,
      fetching: state.fetching
    }
  }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

Chart.PropTypes = {
    w: PropTypes.object,
    fetching: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);

