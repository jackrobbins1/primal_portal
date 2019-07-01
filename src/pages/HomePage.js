import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CategoryChart from '../components/CategoryChart'

class HomePage extends Component{
  // state = {}

  render() {
    return (
      <div>
        <CategoryChart />
      </div>
    )
  }
}

export default HomePage;