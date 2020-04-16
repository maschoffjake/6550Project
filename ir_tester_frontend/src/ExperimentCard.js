import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import {Link, withRouter} from 'react-router-dom';
import Experiment1Pic from './imgs/Experiment1.png';
import Experiment2Pic from './imgs/Experiment2.png';
import Experiment3Pic from './imgs/Experiment3.png';
import Experiment4Pic from './imgs/Experiment4-qual.png';
import './ExperimentCard.css'

class ExperimentCard extends Component {
    render() {
      const path = `/experiment/${this.props.experimentNum}`;
      let imgComponent = null;
      let question= '';
      switch (this.props.experimentNum) {
        case 1:
          imgComponent = Experiment1Pic;
          question = 'What dinosaur species is known to resemble a rhinoceros?';
          break;
        case 2:
          imgComponent = Experiment2Pic;
          question = 'What was the coldest temperature ever recorded in Finmark? (in °C)';
          break;
        case 3:
          imgComponent = Experiment3Pic;
          question = 'Who won the men\'s gold medal in basketball at the 1988 Olympic Games?';
          break;
        case 4:
          imgComponent = Experiment4Pic;
          question = 'What dog breed is good with children and makes a good companion?';
          break;
        default:
          console.log('Bad experiment number, exiting!');
          return;
      }
        return (
            <span className="px-2">
                <Card>
                  <Card.Header as="h5">Experiment {this.props.experimentNum}</Card.Header>
                    <Card.Body>
                      <Card.Title>Description</Card.Title>
                      <Card.Text>
                        {this.props.description}
                      </Card.Text>
                      <br/>
                      <Card.Text>
                        Example of what will be shown:
                      </Card.Text>
                      <Card.Img variant="bottom" src={imgComponent} />
                      <Card.Text>
                      <br/>
                        The question that you will answer is:<br/>
                      </Card.Text>
                      <Card.Text className="question">
                        {question}
                      </Card.Text>
                      <Link className="btn btn-primary" to={path} >Start Experiment {this.props.experimentNum}</Link>
                    </Card.Body>
                </Card>
            </span>
      );
    }
}

export default withRouter(ExperimentCard);