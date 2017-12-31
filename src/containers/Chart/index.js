/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_chart.scss';
import * as d3 from 'd3';
import * as actions from '../../actions/page';

import ToggleDegreeBtn from './ToggleDegreeBtn';

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

        document.querySelector('.temp').innerHTML = JSON.stringify(w);
        document.querySelector('.temp1').innerHTML = degree;
        
        let data = w.query.results.channel.item.forecast.map((obj) => ~~((+obj.high + +obj.low)/2));

        d3.selectAll('.chart > *').remove();

        if (degree == 'f') {
            data = data.map((cels) => toFahr(cels));
        }

        const height = 400,
              barWidth = 30,  
              barMargin = 7.5;
        
        var y = d3.scale.linear()
          .domain([d3.min(data) - 5, d3.max(data) + 5])
          .range([height, 0]);
        
        var chart = d3.select(".chart")
            .attr("height", height + 20)
            .attr("width", barWidth * data.length + Math.max(0, barMargin * (data.length - 1)));
        
        var bar = chart.selectAll("g")
            .data(data)
              .enter()
              .append("g")
            .attr("transform", (d, i) => `translate(${i * (barWidth + barMargin)},0)`);
        
        bar.append("rect")
                .attr("y", function(d) { return y(d); })
            .attr("width", barWidth)
            .attr("height", (d) => height - y(d));
            
        bar.append("text")
            .attr("x", (barWidth)/ 2 )
            .attr("y", height + 10)
            // .attr("dx", ".25em") 
            .text(function(d) { return d; });
        
        


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
        const { degree } = this.props;
        const { toggleDegree } = this.props.actions;

        return(
            <div className="chart--container">
                <ToggleDegreeBtn degree={degree} onClick={toggleDegree} />
                <svg className="chart"></svg>
                <div className="temp"></div>
                <div className="temp1"></div>
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

