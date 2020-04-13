import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Experiment from './Experiment';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


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
        return (
            <Router>
                <Switch>
                    <Route path="/experiment/:experimentID" exact>
                        <Experiment />
                    </Route>                    
                    <Route path="/">
                        <LandingPage callback={this.changeToExperimentCallback}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Main;