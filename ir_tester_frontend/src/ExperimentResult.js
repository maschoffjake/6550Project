import React, { Component } from 'react';
import './Experiment.css';

class ExperimentResult extends Component {
    render() {
        console.log(this.props);
        return (
            <div id="result">
                <a href={this.props.link} dangerouslySetInnerHTML={{__html:this.props.title}} />
                <br />
                <div id="summary" dangerouslySetInnerHTML={{__html:this.props.summary}}/>   {/* Need to do this since HTML is returned... */}
                <div id="meta">
                    {this.props.meta}
                </div>
            </div>
        )
    }
}

  export default ExperimentResult;