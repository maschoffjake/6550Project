import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Experiment from './Experiment';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/experiment/:experimentID" exact>
                        <Experiment />
                    </Route>                    
                    <Route path="/">
                        <LandingPage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Main;