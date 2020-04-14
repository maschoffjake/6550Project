import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './FinishExperiment.css';
import API from './util/API';

class FinishExperiment extends Component {

    constructor(props){
        super(props)
        this.state = {
            experimentNumber: this.props.match.params.experimentID
        }
    }

    render() {
        <div class="Finish">
            <Card>
              <Card.Header as="h5">Finish Experiment {this.props.experimentNum}</Card.Header>
                <Card.Body>
                  <input type=”text” name=”answer” value={this.state.answer}
                      onChange={this.onChangeAnswer.bind(this)}/>
                  <button className="btn btn-success" onclick={this.checkAnswer}> Check Answer {this.props.experimentNum}</button>
                </Card.Body>
            </Card>
        </div>
    }

    onChangeAnswer(event) {
        this.setState({answer: event.target.value})
    }

    checkAnswer() {
        switch (this.state.experimentNumber) {
            case "1":
                if (this.state.answer == "FIXME") {
                    logSuccess();
                    alert("Correct!");
                    window.location.replace("http://localhost:3000/");
                } else {
                    handleFailure();
                }
                break;
            case "2":
                if (this.state.answer == "FIXME") {
                    logSuccess();
                    alert("Correct!");
                    window.location.replace("http://localhost:3000/");
                } else {
                    handleFailure();
                }
                break;
            case "3":
                if (this.state.answer == "FIXME") {
                    logSuccess();
                    alert("Correct!");
                    window.location.replace("http://localhost:3000/");
                } else {
                    handleFailure();
                }
                break;
            case "4":
                if (this.state.answer == "FIXME") {
                    logSuccess();
                    alert("Correct!");
                    window.location.replace("http://localhost:3000/");
                } else {
                    handleFailure();
                }
                break;
            default:
                console.log('BAD API CALL! Using experiment ' + this.state.experimentNumber + ' which is not a valid experiment.');
                return;
        }
    }


    async logSuccess() {
        const experimentSuccess = await API.post(`/experimentsuccess/${this.state.experimentNumber}`,
                                                {
                                                    responseType: 'xml'
                                                });
    }

    handleFailure() {
        alert("Wrong Answer, Try again!")
    }
}

 export default withRouter(FinishExperiment);