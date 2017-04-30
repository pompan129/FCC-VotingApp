import React, { Component } from 'react';
import logo from './logo.svg';
import Header from '../component/header';
import InfoCard from '../component/info-card';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Vote Place</h2>
        </div>
        <InfoCard></InfoCard>
        <InfoCard></InfoCard>
      </div>
    );
  }
}

export default App;
