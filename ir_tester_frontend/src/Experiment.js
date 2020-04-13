import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

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

    }

    /**
     * Used to fetch the experiment results from this 
     */
    fetchExperimentResults() {
        return "";
    }
}

  export default withRouter(Experiment);