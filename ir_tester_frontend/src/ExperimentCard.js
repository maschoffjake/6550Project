import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import {Link, withRouter} from 'react-router-dom';
import Experiment1Pic from './imgs/Experiment1.png';
import Experiment2Pic from './imgs/Experiment2.png';
import Experiment3Pic from './imgs/Experiment3.png';
import Experiment4Pic from './imgs/Experiment4-qual.png';
import './ExperimentCard.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class ExperimentCard extends Component {

    constructor(props) {
        super(props);
         this.state = {
            varianceNum : "-1"
         }
         this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
    }

    handleDropdownSelect(eventKey, event) {
        this.setState({varianceNum : eventKey});
    }

    render() {

      const path = `/experiment/${this.props.experimentNum}/${this.state.varianceNum}`;
      let question = '';
      let description = '';
      let imgComponent = null;

      switch (this.props.experimentNum) {
        case 1:
          question = 'What dinosaur species is known to resemble a rhinoceros?';
          break;
        case 2:
          question = 'What was the coldest temperature ever recorded in Finmark? (in °C)';
          break;
        case 3:
          question = 'What is largest county in Texas by population?';
          break;
        case 4:
          question = 'What dog breed is good with children and makes a good companion?';
          break;
        default:
          console.log('Bad experiment number, exiting!');
          return;
        }

        switch (this.state.varianceNum) {
        case "1":
          imgComponent = Experiment1Pic;
          description = 'Only the document titles will be shown for the relevant documents.';
          break;
        case "2":
          imgComponent = Experiment2Pic;
          description = 'Only the relevance score will be shown for the relevant documents. The relevance score is how relevant the '
                          + 'information retreival model deems the document to be. IE the LOWER the score, the more relevant it is to your query, '
                          + 'and the higher your score the less relevant it is to your query.';
          break;
        case "3":
          imgComponent = Experiment3Pic;
          description = 'Only the snippets for the relevant documents are shown. For example, when using google, it shows the '
                          + 'appearances of the searched keyword within the document. Only these will be shown for the documents.';
          break;
        case "4":
          imgComponent = Experiment4Pic;
          description = 'This is the control experiment. Everything will be displayed, including the document name, relevance score, and snippets.'
          break;
        default:
          imgComponent = new Image();
        }

        if (this.state.varianceNum == "-1") {
            return (
                <span className="px-2">
                    <Card>
                      <Card.Header as="h5">Experiment {this.props.experimentNum}</Card.Header>
                        <Card.Body>
                          <DropdownButton onSelect={this.handleDropdownSelect} title="Variation">
                            <Dropdown.Item eventKey="1">Document Titles</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Relevance Scores</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Snippets</Dropdown.Item>
                            <Dropdown.Item eventKey="4">Control</Dropdown.Item>
                          </DropdownButton>
                          <Card.Text>
                            {description}
                          </Card.Text>
                          <br/>
                          <Card.Text>
                          <br/>
                            The question that you will answer is:<br/>
                          </Card.Text>
                          <Card.Text className="question">
                            {question}
                          </Card.Text>
                          <Link className="btn btn-primary disabled" to={path} >Start Experiment {this.props.experimentNum}</Link>
                        </Card.Body>
                    </Card>
                </span>
          );
        } else {
            return (
                <span className="px-2">
                    <Card>
                      <Card.Header as="h5">Experiment {this.props.experimentNum}</Card.Header>
                        <Card.Body>
                          <DropdownButton onSelect={this.handleDropdownSelect} title="Variation">
                              <Dropdown.Item eventKey="1">Document Titles</Dropdown.Item>
                              <Dropdown.Item eventKey="2">Relevance Scores</Dropdown.Item>
                              <Dropdown.Item eventKey="3">Snippets</Dropdown.Item>
                              <Dropdown.Item eventKey="4">Control</Dropdown.Item>
                            </DropdownButton>
                          <Card.Text>
                            {description}
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
                          <Link className="btn btn-primary" to={path} target="blank">Start Experiment {this.props.experimentNum}</Link>
                        </Card.Body>
                    </Card>
                </span>
          );
        }
    }
}

export default withRouter(ExperimentCard);