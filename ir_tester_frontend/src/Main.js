import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Experiment from './Experiment';

class Main extends Component {
    constructor() {
        super()

        this.state = {
            showExperiment: false,
            experimentNum: 0
        };

        this.changeToExperimentCallback = this.changeToExperiment.bind(this);
    }



    /*
        Change page to expierment page
    */
    changeToExperiment(experimentNumber) {
        this.setState({
            showExperiment: true,
            experimentNum: experimentNumber
        });
    }

    /*
        Change back to the landing page
    */
    changeToLandingPage() {
        this.state.showExperiment = false;
        this.state.experimentNum = 0;
    }

    render() {
        // Check to see what to render (either landing page, or expierment that was clicked)
        if (!this.state.showExperiment) {
            return (
                <LandingPage callback={this.changeToExperimentCallback}/>
            );
        }
        else {
            return (
                <Experiment experimentNumber={this.state.experimentNum}/>
            );
        }
    }
}

export default Main;