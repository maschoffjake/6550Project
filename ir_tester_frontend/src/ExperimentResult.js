import React, { Component } from 'react';
import './Experiment.css';
import {Link} from 'react-router-dom';
import FinishExperiment from './FinishExperiment';

class ExperimentResult extends Component {
    render() {
        const path = `/${this.props.experimentNum}/document?identifier=${this.props.link}`;
        let question = "";
        switch (this.props.experimentNum) {
            case "1":
                question = "Question for Experiment 1: Dinosaur";
                break;
            case "2":
                question = "Question for Experiment 2: WW2";;
                break;
            case "3":
                question = "Question for Experiment 3: Weather";
                break;
            case "4":
                question = "Question for Experiment 4: Police";
                break;
            default:
                console.log('Not a valid experiment number: ' + this.state.experimentNumber);
                return;
        }

        return (
            <div>
                <div id="result">
                    <Link to={path} dangerouslySetInnerHTML={{__html:this.props.title}} />
                    <br />
                    <div id="summary" dangerouslySetInnerHTML={{__html:this.props.summary}}/>   {/* Need to do this since HTML is returned... */}
                    <div id="meta">
                        {this.props.meta}
                    </div>
                </div>
                <FinishExperiment experimentNum={this.props.experimentNum} experimentQuestion={question}/>
            </div>
        )
    }
}

  export default ExperimentResult;