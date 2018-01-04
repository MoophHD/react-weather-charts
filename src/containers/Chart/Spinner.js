// import React from 'react';
import styled, { keyframes } from 'styled-components';

let rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
`

const Spinner = styled.div`
    color: #333;
    font-size: 18px;
    font-family: sans-serif;
    &::after {
        display: inline-block;
        content: '';
        width: 75px;
        height: 75px;
        border-radius: 50%;
        border: solid 2px #ccc;
        border-bottom-color: #66c;
        animation: ${rotate} 1s linear infinite;
        margin-right: 6px;
        vertical-align: bottom;
    }
`

export default Spinner;