import React, { Component } from 'react';
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

class HomePage extends Component{
  constructor(props) {
    super(props)
    this.state = {
      userData: props.userData
    }
  }

  render() {

    return (
      <div className='centerContainer'>

        <h3>Home</h3>

        <Card className='myCard'>
          <CardHeader title='Turkish Getup Records' classes={{ content: 'centerTitle' }}/>

          <CategoryChart />

          <CardActions classes={{root: 'cardActionButtons'}}>
            <Button size="small" color="primary">
              Add Turkish Getup PR
            </Button>
            <Button size="small" color="primary">
              View Record
            </Button>
          </CardActions>
        </Card>

        <Card className='myCard'>
          <CardHeader title='Weight Records' classes={{ content: 'centerTitle' }}/>

          <CategoryChart />

          <CardActions classes={{root: 'cardActionButtons'}}>
            <Button size="small" color="primary">
              Add Turkish Getup PR
            </Button>
            <Button size="small" color="primary">
              View Record
            </Button>
          </CardActions>
        </Card>

        <Card className='myCard'>
          <CardHeader title="PRs You Haven't Recorded" classes={{ content: 'centerTitle' }}/>

          <PRCategoryList categories={this.state.userData.unrecorded_categories} />

        </Card>

      </div>
    )
  }
}

export default HomePage;