import React from 'react';
import PropTypes from 'prop-types';

const ToggleDegreeBtn = ({onClick, degree}) => (
    <button
        className="degreeBtn"
        onClick={onClick}>
        {degree.toUpperCase()}
    </button>
)

ToggleDegreeBtn.PropTypes = {
    onClick: PropTypes.func,
    degree: PropTypes.string
}

export default ToggleDegreeBtn;