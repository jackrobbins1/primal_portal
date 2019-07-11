import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {XYPlot, LineSeries} from 'react-vis';
import AppView from './AppView'
import Navbar from './components/Navbar'
import './App.css';
import '../node_modules/react-vis/dist/style.css';

class App extends Component{
  state = {
    loggedIn: true,
    user_id: 30
  }

  render() {
    return (
      <div>
        <AppView user_id={this.state.user_id} />
      </div>
    )
  }
}

export default App;
