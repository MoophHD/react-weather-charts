import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(val) {
        this.setState(() => {return{value: val}})
    }
    
    handleSubmit(e) {
        if (e.key != 'Enter') return;

        this.props.onSubmit(this.state.value);
    }
    render() {
        return(
            <input 
            value={this.state.value} 
            onChange={(e) => this.handleChange(e.target.value)}
            onKeyDown={this.handleSubmit}></input>
        )
    }
}

SearchBar.PropTypes = {
    onSubmit: PropTypes.func
}

export default SearchBar;