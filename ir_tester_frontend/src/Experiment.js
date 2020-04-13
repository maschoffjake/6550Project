import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './Experiment.css';
import API from './util/API';
import ExperimentResult from './ExperimentResult';

class Experiment extends Component {
    constructor(props){
        super(props)
        this.state = {
            experiments: [],
            experimentNumber: this.props.match.params.experimentID
        }
        this.experiment1Query = 'dinosaur';
        this.experiment2Query = 'world+war+2';
        this.experiment3Query = 'weather';
        this.experiment4Query = 'police';
    }
    render() {
        return (
            this.state.experiments.map((item) => (
                <ExperimentResult title={item.Title} link={item.Link} summary={item.Summary} meta={item.Meta} score={item.Score} document={item.Document}/>
            ))
        );
    }

    /**
     * Make API call to grab data
     */
    async componentDidMount() {
        let query = '';
        switch (this.state.experimentNumber) {
            case "1":
                query += `?q=${this.experiment1Query}`;
                break;
            case "2":
                query += `?q=${this.experiment2Query}`;
                break;
            case "3":
                query += `?q=${this.experiment3Query}`;
                break;
            case "4":
                query += `?q=${this.experiment4Query}`;
                break;
            default:
                console.log('BAD API CALL! Using experiment ' + this.state.experimentNumber + ' which is not a valid experiment.');
                return;
        }
        const experimentData = await API.get(`/experiment/${this.state.experimentNumber}${query}`);
        this.setState({
            experiments: experimentData.data
        });
    }
}

  export default withRouter(Experiment);