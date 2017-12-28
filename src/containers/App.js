/* eslint-ignore */

import React, { Component } from 'react';
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as d3 from 'd3';

class App extends Component {
  constructor(props) {
    super(props);

    this.loadChart = this.loadChart.bind(this);
    this.buildChart = this.buildChart.bind(this);
  }

  loadChart() {
    let link = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="nome, ak") and u=\'c\' '
    let xhr = new XMLHttpRequest();

    let cb = this.buildChart;

    xhr.open("GET",`https://query.yahooapis.com/v1/public/yql?q=${link}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,true);
    xhr.send(); 
    
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){ 
      
        var w = JSON.parse(xhr.responseText);
        cb(w.query.results.channel.item.forecast); // sends array of objects
      }
    };
  }

  buildChart(forecast) {
    console.log(forecast);
    let temps = forecast.map((obj) => ~~((+obj.high + +obj.low)/2));
    temps = temps.map(tp => Math.abs(tp));

    var x = d3.scale.linear()
    .domain([0, temps.length])
    .range([10, 420]);

    console.log(temps);
    let chart = d3.select(".chart");
    chart.selectAll('div')
      .data(temps)
      .enter()
      .append('div')
      .style('width', (d) => x(Math.abs(d)) + 'px')
      .text((d) => d)
  }

  render() {
    return (
      <div 
        className="app">
        <button onClick={this.loadChart}>load Chart</button>
        <div className="chart"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    score: state.score
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(pageActions, dispatch), // eslint-disable-line
//     dtActions : bindActionCreators(dtActions, dispatch)
//   }
// }

export default connect(mapStateToProps, null)(App);

