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
        return (
            <div id="document" dangerouslySetInnerHTML={{__html:this.state.docData}}/>
            <FinishExperiment experimentNum={this.state.experimentNumber}/>
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