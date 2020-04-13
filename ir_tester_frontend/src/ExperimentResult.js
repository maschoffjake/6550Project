import React, { Component } from 'react';
import './Experiment.css';

class ExperimentResult extends Component {
    constructor() {
        super()
        this.state = {
            link: null,
            summary: null,
            meta: null
        }
    }
    render() {
        return (
            <div id="result">
                {this.state.link}
                <br />
                <div id="summary">
                    {this.state.summary}
                </div>
                <div id="meta">
                    {this.state.meta}
                </div>
            </div>
        )
    }
}

  export default ExperimentResult;