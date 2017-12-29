import React from 'react';
import PropTypes from 'prop-types';

const ToggleDegreeBtn = ({onClick}) => (
    <div 
        style={{backgroundColor: 'crimson', width: '100px', height: '100px'}}
         onClick={onClick}>
    </div>
)

ToggleDegreeBtn.PropTypes = {
    onClick: PropTypes.func
}

export default ToggleDegreeBtn;