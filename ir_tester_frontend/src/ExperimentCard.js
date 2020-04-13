import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import {Link, withRouter} from 'react-router-dom';

class ExperimentCard extends Component {
    render() {
      const path = `/experiment/${this.props.experimentNum}`;
        return (
            <span className="px-2">
                <Card>
                  <Card.Header as="h5">Experiment {this.props.experimentNum}</Card.Header>
                    <Card.Body>
                      <Card.Title>Description</Card.Title>
                      <Card.Text>
                        {this.props.description}
                      </Card.Text>
                        <Link className="btn btn-primary" to={path} >Start Experiment {this.props.experimentNum}</Link>
                    </Card.Body>
                </Card>
            </span>
      );
    }
}

export default withRouter(ExperimentCard);