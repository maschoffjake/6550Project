import React, { Component } from 'react';
import API from './util/API';
import {withRouter} from 'react-router-dom';
import FinishExperiment from './FinishExperiment';

class Document extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            docData: null,
            experimentNumber: this.props.match.params.experimentID
        }
    }

    render() {
        let question = "";
        switch (this.state.experimentNumber) {
            case "1":
                question = "Question for Experiment 1: What dinosaur species is known to resemble a rhinoceros?";
                break;
            case "2":
                question = "Question for Experiment 2: What was the coldest temperature ever recorded in Finnmark? (in °C)";;
                break;
            case "3":
                question = "Question for Experiment 3: What is largest county in Texas by population?";
                break;
            case "4":
                question = "Question for Experiment 4: What dog breed is good with children and makes a good companion?";
                break;
            default:
                console.log('Not a valid experiment number: ' + this.state.experimentNumber);
                return;
        }

        return (
            <div>
                <div id="document" dangerouslySetInnerHTML={{__html:this.state.docData}}/>
                <FinishExperiment experimentNum={this.state.experimentNumber} experimentQuestion={question}/>
            </div>
        );
    }

    /**
     * Make API call to grab data
     */
    async componentDidMount() {
        const query = `document${this.props.location.search}`;
        console.log(query);
        const experimentData = await API.get(query,
                                    {
                                        responseType: 'text'
                                    });
        console.log(experimentData);
        this.setState({
            isLoaded: true,
            docData: experimentData.data
        });
    }
}

  export default withRouter(Document);