import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {XYPlot, LineSeries} from 'react-vis';
import AppView from './AppView';
import Login from './pages/Login';
import Navbar from './components/Navbar'
import './App.css';
import '../node_modules/react-vis/dist/style.css';

class App extends Component{
  state = {
    loggedIn: false,
    user_id: 30
  }

  setLogin = userID => {
    this.setState({
      loggedIn: true,
      user_id: userID
    })
  }

  render() {
    return (
      <div>
        
        {this.state.loggedIn ? <AppView user_id={this.state.user_id} />
         : 
        <Login setLogin={this.setLogin} />}
      </div>
    )
  }
}

export default App;
