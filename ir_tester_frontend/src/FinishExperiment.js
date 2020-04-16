import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import './FinishExperiment.css';
import API from './util/API';

class FinishExperiment extends Component {

    constructor(props){
        super(props)
        this.state = {
            experimentNumber: this.props.experimentNum,
            experimentQuestion: this.props.experimentQuestion,
            answer: ''
        }
        this.onChangeAnswer = this.onChangeAnswer.bind(this)
        this.checkAnswer = this.checkAnswer.bind(this)
    }

    render() {
        return(
            <div className="Finish">
                <Card>
                  <Card.Header as="h5">Finish Experiment {this.props.experimentNum}</Card.Header>
                    <Card.Body>
                    <Card.Text>{this.state.experimentQuestion}</Card.Text>
                     <input type="text" name="answer" value={this.state.answer}
                          onChange={this.onChangeAnswer}/>
                      <button className="btn btn-success" onClick={this.checkAnswer}> Check Answer </button>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    onChangeAnswer(event) {
        this.setState({answer: event.target.value})
    }

    checkAnswer() {
        switch (this.state.experimentNumber) {
            case "1":
                if (this.state.answer === "FIXME") {
                    this.logSuccess();
                    alert("Correct! Done with experiment 1. Click ok to return to the homepage.");
                    window.location.replace("http://localhost:3000/");
                } else {
                    this.handleFailure();
                }
                break;
            case "2":
                if (this.state.answer === "FIXME") {
                    this.logSuccess();
                    alert("Correct! Done with experiment 2. Click ok to return to the homepage.");
                    window.location.replace("http://localhost:3000/");
                } else {
                    this.handleFailure();
                }
                break;
            case "3":
                if (this.state.answer === "FIXME") {
                    this.logSuccess();
                    alert("Correct! Done with experiment 3. Click ok to return to the homepage.");
                    window.location.replace("http://localhost:3000/");
                } else {
                    this.handleFailure();
                }
                break;
            case "4":
                if (this.state.answer === "FIXME") {
                    this.logSuccess();
                    alert("Correct! Done with experiment 4. Click ok to return to the homepage.");
                    window.location.replace("http://localhost:3000/");
                } else {
                    this.handleFailure();
                }
                break;
            default:
                console.log('BAD API CALL! Using experiment ' + this.state.experimentNumber + ' which is not a valid experiment.');
                return;
        }
    }


    async logSuccess() {
        await API.get(`/success/${this.state.experimentNumber}`,
                                                {
                                                    responseType: 'xml'
                                                });
    }

    handleFailure() {
        alert("Wrong Answer, Try again!")
    }
}

 export default withRouter(FinishExperiment);