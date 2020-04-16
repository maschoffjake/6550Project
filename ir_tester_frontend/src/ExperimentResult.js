import React, { Component } from 'react';
import './Experiment.css';
import {Link} from 'react-router-dom';
import FinishExperiment from './FinishExperiment';

class ExperimentResult extends Component {
    render() {
        const path = `/${this.props.experimentNum}/document?identifier=${this.props.link}`;
        let question = "";
        let title = `Document ${this.props.index}`;
        let summary = "";
        let meta = "";
        switch (this.props.experimentNum) {
            case "1":
                question = "Question for Experiment 1: Dinosaur";
                title = this.props.title.slice(0, -35);     // Last 35 characters are not needed (wikipedia characters)
                break;
            case "2":
                question = "Question for Experiment 2: WW2";
                summary = `Score: ${(this.props.score * -1).toFixed(4)}`;
                break;
            case "3":
                question = "Question for Experiment 3: Weather";
                summary = this.props.summary;
                break;
            case "4":
                summary = this.props.summary;
                title = this.props.title.slice(0, -35);     // Last 35 characters are not needed (wikipedia characters)
                meta = `Score: ${(this.props.score * -1).toFixed(4)}`;
                question = "Question for Experiment 4: Police";
                break;
            default:
                console.log('Not a valid experiment number: ' + this.state.experimentNumber);
                return;
        }

        return (
            <div>
                <div id="result">
                    <Link to={path} dangerouslySetInnerHTML={{__html:title}}/>
                    <br />
                    <div id="summary" dangerouslySetInnerHTML={{__html:summary}}/>
                    <div id="meta">{meta}</div>
                </div>
                <FinishExperiment experimentNum={this.props.experimentNum} experimentQuestion={question}/>
            </div>
        )
    }
}

  export default ExperimentResult;