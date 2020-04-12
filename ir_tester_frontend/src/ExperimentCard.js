import React, { Component } from 'react';
import './LandingPage.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class ExperimentCard extends Component {
    render() {
        return (
            <span className="px-2">
                <Card>
                  <Card.Header as="h5">Experiment {this.props.experimentName}</Card.Header>
                    <Card.Body>
                      <Card.Title>Description</Card.Title>
                      <Card.Text>
                        {this.props.description}
                      </Card.Text>
                          <Button variant="outline-primary" onClick={() => this.props.callback(this.props.experimentName)} >Start Experiment {this.props.experimentName}</Button>{' '}
                    </Card.Body>
                </Card>
            </span>
      );
    }
}

export default ExperimentCard