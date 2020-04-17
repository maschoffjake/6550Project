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
                question = "Question for Experiment 1: What dinosaur species is known to resemble a rhinoceros?";
                break;
            case "2":
                question = "Question for Experiment 2: What was the coldest temperature ever recorded in Finmark? (in °C)";
                break;
            case "3":
                question = "Question for Experiment 3: Who won the men's gold medal in basketball at the 1988 Olympic Games?";
                break;
            case "4":
                question = "Question for Experiment 4: What dog breed is good with children and makes a good companion?";
                break;
            default:
                console.log('Not a valid experiment number: ' + this.state.experimentNumber);
                return;
        }

        switch (this.props.varianceNum) {
            case "1":
              title = this.props.title.slice(0, -35);     // Last 35 characters are not needed (wikipedia characters)
              break;
            case "2":
              summary = `Score: ${(this.props.score * -1).toFixed(4)}`;
              break;
            case "3":
              summary = this.props.summary;
              break;
            case "4":
              summary = this.props.summary;
              meta = `Score: ${(this.props.score * -1).toFixed(4)}`;
              break;
        }

        title = this.props.title.slice(0, -35);     // Last 35 characters are not needed (wikipedia characters)


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