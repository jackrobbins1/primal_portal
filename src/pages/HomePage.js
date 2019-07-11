import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CategoryChartt from '../components/CategoryChartt';
import WeightChart from '../components/WeightChart';
import PRCategoryList from '../components/PRCategoryList';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

class HomePage extends PureComponent{
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     userData: props.userData
  //   }
  // }

  render() {

    const prCategories = [1, 3, 4, 5]
    const randomCat = Math.floor(Math.random() * 3)

    return (
      <div className='centerContainer'>

        <h3>Home</h3>

          {/* <CategoryChart /> */}
          <CategoryChartt
            prCategoryID={prCategories[randomCat].toString()}
            userID={this.props.userData.user_info.id}
            fetchNewData={this.props.fetchNewData}
            homeChart={true}
          //  prCategoryID={this.state.prCategoryID === "" ? 1 : this.state.prCategoryID}
          />

          <WeightChart userData={this.props.userData} fetchNewData={this.props.fetchNewData}/>


        <Card className='myCard'>
          <CardHeader title="PRs You Haven't Recorded" classes={{ content: 'centerTitle' }}/>

          <PRCategoryList categories={this.props.userData.unrecorded_categories} />

        </Card>

      </div>
    )
  }
}

export default HomePage;