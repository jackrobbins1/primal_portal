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
    user_id: localStorage.getItem("user_id") || false
  }

  setLogin = resp => {
    localStorage.setItem("token", `${resp.token}`)
    localStorage.setItem("user_id", `${resp.user_info.id}`)
    this.setState({
      user_id: resp.user_info.id
    })
  }

  handleLogout = () => {
    localStorage.setItem("user_id", "")
    localStorage.setItem("token", "")
    this.setState({user_id: false})
  }

  render() {
    return (
      <div>
        
        {/* {this.state.loggedIn ? <AppView user_id={this.state.user_id} /> */}
        {this.state.user_id ? <AppView user_id={this.state.user_id} handleLogout={this.handleLogout} />
         : 
        <Login setLogin={this.setLogin} />}
      </div>
    )
  }
}

export default App;
