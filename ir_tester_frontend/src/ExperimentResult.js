import React, { Component } from 'react';
import './Experiment.css';
import {Link} from 'react-router-dom';

class ExperimentResult extends Component {
    render() {
        const path = `/${this.props.experimentNum}/document?identifier=${this.props.link}`;
        return (
            <div id="result">
                <Link to={path} dangerouslySetInnerHTML={{__html:this.props.title}} />
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