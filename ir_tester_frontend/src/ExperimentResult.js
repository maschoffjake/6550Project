import React, { Component } from 'react';
import './Experiment.css';

class ExperimentResult extends Component {
    render() {
        console.log(this.props);
        return (
            <div id="result">
                {this.props.link}
                <br />
                <div id="summary">
                    {this.props.summary}
                </div>
                <div id="meta">
                    {this.props.meta}
                </div>
            </div>
        )
    }
}

  export default ExperimentResult;