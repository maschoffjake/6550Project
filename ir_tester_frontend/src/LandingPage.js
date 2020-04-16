import React, { Component } from 'react';
import './LandingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ExperimentCard from './ExperimentCard';
import {withRouter} from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <header className="App-header">
        <Jumbotron fluid>
            <h1 className="projectTitle">Rating of Search Engine Properties</h1>
            <h2 className="authors">Jake Maschoff, Melvin Bosnjak, Bond Denhalter</h2>
            <h2 className="info">Click any of the experiment buttons to begin an experiment!</h2>
            
            {/* Button row */}
            <div className="cardDeck">
              <ExperimentCard experimentNum={1}  description={getExperiment1Description()} />
              <ExperimentCard experimentNum={2}  description={getExperiment2Description()} />
              <ExperimentCard experimentNum={3}  description={getExperiment3Description()} />
              <ExperimentCard experimentNum={4}  description={getExperiment4Description()} />
            </div>
  
        </Jumbotron>
      </header>
    );
  }
}

function getExperiment1Description() {
  return 'Only the document titles will be shown for the relevant documents.'
}

function getExperiment2Description() {
  return 'Only the relevance score will be shown for the relevant documents. The relevance score is how relevant the '
  + 'information retreival model deems the document to be. IE the LOWER the score, the more relevant it is to your query, '
  + 'and the higher your score the less relevant it is to your query.'
}

function getExperiment3Description() {
  return 'Only the snippets for the relevant documents are shown. For example, when using google, it shows the '
  + 'appearances of the searched keyword within the document. Only these will be shown for the documents!'
}

function getExperiment4Description() {
  return 'Control experiment! Everything will be displayed, including the document name, relevance score, and snippets.'
}

export default withRouter(LandingPage);
