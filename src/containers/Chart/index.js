/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_chart.scss';
import * as d3 from 'd3';
import * as actions from '../../actions/page';

import ToggleDegreeBtn from './ToggleDegreeBtn';

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
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

        document.querySelector('.temp').innerHTML = JSON.stringify(w);
        document.querySelector('.temp1').innerHTML = degree;
        
        const width = 960,
              height = 500;
        
        let data = w.query.results.channel.item.forecast.map((obj) => ~~((+obj.high + +obj.low)/2));

        var x = d3.scale.linear()
            .domain([d3.min(data), d3.max(data)])
            .range([50, 420]);

        d3.selectAll('.chart > *').remove();
        let chart = d3.select(".chart");
        d3.select('.chart').selectAll('div')
          .data(data)
          .enter()
          .append('div')
          .style('width', (d) => x(d) + 'px')
          .text((d) => d)

        /*
            
        var y = d3.scale.linear()
            .range([height, 0]);

        var chart = d3.select(".chart")
            .attr("width", width)
            .attr("height", height);

        var barWidth = width / data.length;

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });
        
        bar.append("rect")
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .attr("width", barWidth - 1);
        
        bar.append("text")
            .attr("x", barWidth / 2)
            .attr("y", function(d) { return y(d.value) + 3; })
            .attr("dy", ".75em")
            .text(function(d) { return d.value; });

            */
    }

    componentDidUpdate() {
        console.log('!');
        this.loadChart();
    }

    componentDidMount() {
        if (Object.keys(this.props.w).length > 0 ) this.loadChart;
    }
    
    render() {
        // const { w, degree } = this.props;
        const { toggleDegree } = this.props.actions;

        return(
            <div className="chart--container">
                <ToggleDegreeBtn onClick={toggleDegree} />
                <div className="chart"></div>
                <div className="temp"></div>
                <div className="temp1"></div>
                {/* <svg className="chart"></svg> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      w: state.w,
      degree: state.degree
    }
  }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);