import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, MarkSeries, Hint} from 'react-vis';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import AddPrButton from './AddPrButton';

const moment = require('moment');
console.log(moment("20111031", "YYYYMMDD").fromNow())

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class CategoryChartt extends Component{
  state = {
    newData: "a",
    hintData: false,
    categoryTitle: undefined,
    xAxis: 'age',
    yAxis: 'weight',
    filterGender: 'both',
    categoryList: {
      list_with_types: null
    }
  }

  componentDidMount() {
      fetch(`http://localhost:3000/api/v1/pr_categories`)
      .then(resp => resp.json())
      .then(data => {
          this.setState({categoryList: data})
      })
  }

  componentWillReceiveProps(nextProps) {
    fetch(`http://localhost:3000/api/v1/pr_categories/${nextProps.prCategoryID}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        newData: data,
        categoryTitle: data.category_info,
        yAxis: data.category_chart_data.length > 0 ? data.category_chart_data[0].recordType : 'weight'
      })
    })
  }

  filterHintData = data => {

    const record_type = {
      weight: "recordWeight",
      reps: "recordReps"
    }

    const xAxisTypes = {
      'age': 'userBday',
      'weight': 'userBodyWeight',
      'height': 'userHeight'
    }
    let newData = {
        // User: this.capital_letter(data.userPseudo),
        User: data.userPseudo,
        x: data[xAxisTypes[this.state.xAxis]],
        y: data[record_type[`${data.recordType}`]],
    }

    if(this.state.xAxis === 'age') {
      newData.x = parseInt(moment().diff(newData.x, 'years'))
    }

    return newData
  }

  capital_letter = str => {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
  }

  handleChangeXAxis = event => {
    this.setState({xAxis: event.target.value})
  }

  handleChangeFilterGender = event => {
    this.setState({filterGender: event.target.value})
  }


  render() {

    const { classes } = this.props;

    const axisLabels = {
      yAxisLabels: {
        "weight": "Weight (kg)",
        "reps": "Reps",
        "time": "Time (mm:ss)"
      },
      xAxisLabels: {
        "weight": "Member weight (lbs)",
        "age": "Member Age (years)",
        "height": "Member height (inches)"
      }
    }

    let chartData = () => {
        let array = null
        if (this.state.newData !== "a" ) {
            const record_type = {
                weight: "recordWeight",
                reps: "recordReps"
            }

            const xAxisTypes = {
              'age': 'userBday',
              'weight': 'userBodyWeight',
              'height': 'userHeight'
            }
            array = this.state.newData.category_chart_data.map(obj => {
                let newObj = Object.assign({}, obj)
                newObj.y = newObj[record_type[`${obj.recordType}`]]
                newObj.x = newObj[xAxisTypes[this.state.xAxis]]
                if (xAxisTypes[this.state.xAxis] === 'userBday') {
                  newObj.x = parseInt(moment().diff(newObj.x, 'years')) 
                }
                return newObj
            })
            // filter the data points based on gender e.g. male / female 
            if (this.state.filterGender !== 'both') {
              array = array.filter(obj => obj.userGender === this.state.filterGender)
            }
        }
        return array
    }

    const chartSize = window.innerWidth * 0.50

    return (
      <div>
        <Card className='myCard'>
          <CardHeader title={this.state.categoryTitle} classes={{ content: 'centerTitle' }}/>

          <XYPlot height={chartSize} width={chartSize}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title={axisLabels.xAxisLabels[this.state.xAxis]}/>
            <YAxis title={axisLabels.yAxisLabels[this.state.yAxis]}/>
            <MarkSeries 
                animation={true}
                opacityType={'literal'}
                colorType='literal'
                strokeType='literal'
                data={chartData() !== null ? chartData() : [{x:0,y:0}] }
                className="mark-series-example"
                strokeWidth={2}
                opacity="0.7"
                sizeRange={[5, 30]}
                onNearestXY={value => this.setState({hintData: this.filterHintData(value)})}
            />
            {this.state.hintData ? <Hint value={this.state.hintData} /> : null}
            {/* <Hint value={dataPoint} /> */}
          </XYPlot>

          <CardActions classes={{root: 'cardActionButtons'}}>
            {this.state.categoryList.list_with_types ? <AddPrButton categoryList={this.state.categoryList.list_with_types} prCategoryID={parseInt(this.props.prCategoryID)} userID={this.props.userID} fetchNewData={this.props.fetchNewData} /> : null }
            <form className={classes.root} autoComplete='off'>
              <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="age-simple">X Axis:</InputLabel> */}
                <Select
                  value={this.state.xAxis}
                  onChange={this.handleChangeXAxis}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value={'age'}>Age</MenuItem>
                  <MenuItem value={'weight'}>Weight</MenuItem>
                  <MenuItem value={'height'}>Height</MenuItem>
                </Select>
                <FormHelperText>Change X Axis Category</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="age-simple">Filter M/F:</InputLabel> */}
                <Select
                  value={this.state.filterGender}
                  onChange={this.handleChangeFilterGender}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value={'both'}>
                    Both
                    {/* <em>None</em> */}
                  </MenuItem>
                  <MenuItem value={'m'}>Men</MenuItem>
                  <MenuItem value={'f'}>Women</MenuItem>
                </Select>
                <FormHelperText>Show Men or Women</FormHelperText>
              </FormControl>
            </form>

          </CardActions>
        </Card>


      </div>
    )
  }
}

CategoryChartt.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryChartt);