import React from 'react';
import './LandingPage.css';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function ExperimentCard(props) {
    return (
    <span>
        <Card>
          <Card.Header as="h5">{props.experimentName}</Card.Header>
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text>
                {props.description}
              </Card.Text>
            <Button variant="primary">Start {props.experimentName}</Button>
            </Card.Body>
        </Card>
    </span>
    )
}

export default ExperimentCard