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
}

  export default withRouter(Experiment);