import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './Experiment.css';
import API from "./util/API";


class Experiment extends Component {
    constructor(){
        super()
        this.state = {
            experiments: []
        }
    }
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
    async componentDidMount() {
        console.log('Making call')
        const experimentData = await API.get(`/experiment/${this.props.match.params.experimentID}`);
        console.log('Data back:' + experimentData);
    }
}

  export default withRouter(Experiment);