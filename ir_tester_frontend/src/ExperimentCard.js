import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';

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
                        <Link className="btn btn-primary" to="/experiment" > Experiment </Link>
                    </Card.Body>
                </Card>
            </span>
      );
    }
}

export default ExperimentCard;