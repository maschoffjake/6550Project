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
            experimentNumber: this.props.match.params.experimentID,
            varianceNum: this.props.match.params.varianceNum
        }
        this.experiment1Query = 'dinosaur+species+rhino';
        this.experiment2Query = 'coldest+temperature+finnmark';
        this.experiment3Query = 'texas+county';
        this.experiment4Query = 'dog+breeds+children';
    }
    render() {
        let displayQuery = '';
        console.log(this.experiment1Query.split("+").join(' '));
        switch (this.state.experimentNumber) {
            case "1":
                displayQuery = this.experiment1Query.split("+").join(' ')
                break;
            case "2":
                displayQuery = this.experiment2Query.split("+").join(' ')
                break;
            case "3":
                displayQuery = this.experiment3Query.split("+").join(' ')
                break
            default:
                displayQuery = this.experiment4Query.split("+").join(' ')
                break;
        }
        return (
            <div>
                <span className="query">
                    Results using query: &nbsp;
                    <span className="queryResult">
                        { displayQuery }
                    </span>
                </span>
                <div>
                    {
                        this.state.experiments.map((item, index) => (
                            <ExperimentResult index={index+1} varianceNum={this.state.varianceNum} experimentNum={this.state.experimentNumber} key={item.Title} title={item.Title} link={item.Link} summary={item.Summary} meta={item.Meta} score={item.Score} document={item.Document}/>
                        ))
                    }
                </div>
            </div>
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
        query += `&variance=${this.state.varianceNum}`;
        const experimentData = await API.get(`/experiment/${this.state.experimentNumber}${query}`,
                                                {
                                                    responseType: 'json'
                                                });
        this.setState({
            experiments: experimentData.data
        });
    }
}

  export default withRouter(Experiment);