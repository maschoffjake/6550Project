import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Experiment extends Component {
    render() {
        console.log('Creating experiment');
        return (
            <p>
                Hi experiment { this.props.experimentNumber }!
            </p>
        )
    }
}

  export default Experiment;