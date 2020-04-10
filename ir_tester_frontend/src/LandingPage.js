import React from 'react';
import './LandingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import ExperimentCard from './ExperimentCard'

function App() {
  return (
    <header className="App-header">
      <p>
      <Jumbotron fluid>
          <h1 className="projectTitle">Rating of Search Engine Properties</h1>
          <h2 className="authors">Jake Maschoff, Melvin Bosnjak, Bond Denhalter</h2>
          <h2 className="info">Click any of the experiment buttons to begin an experiment!</h2>
          
          {/* Button row */}
          <div className="buttonRow">
            <ExperimentCard experimentName="Experiment 1" description={getExperiment1Description()} />
            <ExperimentCard experimentName="Experiment 2" description={getExperiment2Description()} />
            <ExperimentCard experimentName="Experiment 3" description={getExperiment3Description()} />
            <ExperimentCard experimentName="Experiment 4" description={getExperiment4Description()} />
          </div>

      </Jumbotron>
      </p>
    </header>
  );
}

function getExperiment1Description() {
  return "Remove snippets"
}

function getExperiment2Description() {
  return "Remove snippets"
}

function getExperiment3Description() {
  return "Remove snippets"
}

function getExperiment4Description() {
  return "Remove snippets"
}

export default App;
