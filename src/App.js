import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {XYPlot, LineSeries} from 'react-vis';
import Home from './pages/HomePage'
import './App.css';
import '../node_modules/react-vis/dist/style.css';

class App extends Component{
  state = {
    user_id: 59
  }

  render() {
    return (
      <Router>

        <div>
          <Route exact path="/" component={() => <Home data={this.state} />} />
        </div>

      </Router>
    )
  }
}

export default App;
