import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Experiment extends Component {
    render() {
        return (
            <p>
                Hi experiment { this.props.experimentNumber }!
            </p>
        )
    }
}

  export default withRouter(Experiment);