import React from 'react';
import PropTypes from 'prop-types';

const ToggleDegreeBtn = ({onClick, degree}) => (
    <button
        className="btn"
        onClick={onClick}>
        <span className={`btn--degree ${degree == 'c' ? 'btn--degree-active' : ''}`}>C</span>
        <span className={`btn--degree ${degree == 'f' ? 'btn--degree-active' : ''}`} >F</span>
    </button>
)

ToggleDegreeBtn.PropTypes = {
    onClick: PropTypes.func,
    degree: PropTypes.string
}

export default ToggleDegreeBtn;