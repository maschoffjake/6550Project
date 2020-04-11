import React, { Component } from 'react';
import './LandingPage.css';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Experiment from './Experiment'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


class ExperimentCard extends Component {
    render() {
        return (
          <span className="px-2">
              <Card>
                <Card.Header as="h5">{this.props.experimentName}</Card.Header>
                  <Card.Body>
                    <Card.Title>Description</Card.Title>
                    <Card.Text>
                      {this.props.description}
                    </Card.Text>
                      <Button variant="primary">Start {this.props.experimentName}</Button>
                  </Card.Body>
              </Card>
          </span>
      );
    }
}

export default ExperimentCard