import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './Experiment.css';
import API from "./utils/API";


class Experiment extends Component {
    render() {
        return (
            <p>
                Hi experiment { this.props.match.params.experimentID }!
            </p>
        )
    }

    /**
     * Make API call to grab data
     */
    componentDidMount() {
        const experimentData = await API.get(`/experiment${this.props.match.params.experimentID}`);
        console.log(experimentData);
    }
}

  export default withRouter(Experiment);