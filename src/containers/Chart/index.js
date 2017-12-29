import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as d3 from 'd3';
import * as actions from '../../actions/page'

import ToggleDegreeBtn from './ToggleDegreeBtn'



class Chart extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.degree != nextProps.degree ||
            JSON.stringify(this.props.w) != JSON.stringify(nextProps.w)) {
            this.loadChart();
        }
    }

    loadChart() {
        const { w, degree } = this.props;
        console.log(degree);
        document.querySelector('.temp').innerHTML = JSON.stringify(w);
    }
    
    render() {
        const { toggleDegree } = this.props.actions;

        return(
            <div className="chart--container">
                <ToggleDegreeBtn onClick={toggleDegree} />
                <div className="temp"></div>
                <svg className="chart">
                </svg>
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