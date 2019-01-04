import React, { Component } from 'react';
import logo from './assets/logo_header.png';
import DigitalClock from "react-digital-clock";
import AnalogClock from "react-clock";
import "./App.scss"

import Table from "./components/Table.js";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    //change analog clock
    setInterval(
      () => this.setState({date: new Date()}),
      1000
    )
  }

  render() {
    return (
      <div className="App">
        <div id="main-container">
          <header>
            <img src={logo} />
            <h1>
              <span className="first">Clock</span>
              <span className="second">r</span>
            </h1>
          </header>
          <h2>Clock-ins for {this.state.date.toLocaleDateString()}</h2>
          <div className="clocks">
            <div className="digital-clock">
              <DigitalClock />
            </div>
            <AnalogClock value={this.state.date} size={400} className="analog-clock" />
          </div>

          <Table />

        </div>

      </div>
    );
  }
}

export default App;
