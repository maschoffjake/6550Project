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
    }
    render() {
        return (
            this.state.experiments.map((item) => {
                <ExperimentResult />
            })
        )
    }

    /**
     * Make API call to grab data
     */
    async componentDidMount() {
        console.log('Making call')
        let query = '';
        switch (this.state.experimentNumber) {
            case "1":
                query += '?q=dinosaur';
                break;
            case 2:
                query += '?q=world+war+2';
                break;
            case 3:
                query += '?q=weather';
                break;
            case 4:
                query += '?q=police';
                break;
            default:
                console.log('BAD API CALL! Using experiment ' + this.state.experimentNumber + ' which is not a valid experiment.');
                return;
        }
        console.log(query);
        const experimentData = await API.get(`/experiment/${this.state.experimentNumber}${query}`);
        this.setState({
            experiments: experimentData.data
        });
    }
}

  export default withRouter(Experiment);