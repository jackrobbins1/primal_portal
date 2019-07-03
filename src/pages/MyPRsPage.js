import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CategoryChart from '../components/CategoryChart'

import PRCategoryList from '../components/PRCategoryList'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';

class MyPRsPage extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
      userData: props.userData
    }
  }

  render() {

    return (
      <div>
        <h5>My Personal Records</h5>
        <PRCategoryList categories={this.props.completedPRs}/>
        <Divider />
        <h5>Events You Haven't Recorded A PR:</h5>
        <PRCategoryList categories={this.props.unrecordedPRs}/>

      </div>
    )
  }
}

export default MyPRsPage;