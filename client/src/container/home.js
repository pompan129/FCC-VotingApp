import React, { Component } from 'react';
import logo from './logo.svg';
//import Header from '../component/header'; //todo
import InfoCard from '../component/info-card';
import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Vote Place!</h2>
        </div>
        <InfoCard></InfoCard>
        <InfoCard></InfoCard>
      </div>
    );
  }
}

export default Home;
