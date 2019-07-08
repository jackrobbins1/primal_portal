import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries, Hint} from 'react-vis';

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

const moment = require('moment');

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

class WeightChart extends Component{
  state = {
    propDataLoaded: false,
    newData: "a",
    hintData: false,
    categoryTitle: undefined,
    xAxis: 'age',
    yAxis: 'weight',
    filterGender: ''
  }

  componentDidMount() {
    if (this.props.userData) {
      this.setState({propDataLoaded: true})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userData) {
      this.setState({propDataLoaded: true})
    }
  }

  filterHintData = data => {
    // debugger;

    const recordUnits = {
      'weight': 'lbs',
      'fatPerc': '%',
      'muscPerc': '%'
    }

    const loggedInUser = this.props.userData.user_info

    let newData = {
        // User: this.capital_letter(data.userPseudo),
        x: data.x,
        y: data.y,
        // user: `${loggedInUser.first_name} ${loggedInUser.last_name}`,
        date: moment(data.weigh_date, 'YYYY-MM-DD').format('MM-DD-YYYY'),
        record: data.y + ` ${recordUnits[this.state.yAxis]}`
    }

    if (this.state.yAxis !== 'weight') {
      newData.record = (data.y * 100).toFixed(0) + `${recordUnits[this.state.yAxis]}`
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

  handleChangeFilterGender = event => {
    this.setState({filterGender: event.target.value})
  }
  handleChangeYAxis = event => {
    this.setState({yAxis: event.target.value})
  }


  render() {

    const { classes } = this.props;

    const axisLabels = {
      yAxisLabels: {
        'weight': 'Weight (lbs)',
        'fatPerc': 'Body Fat Percent',
        'muscPerc': 'Body Muscle Percent'
      },
      xAxisLabels: {
        "weight": "Member weight (lbs)",
        "age": "Member Age (years)",
        "height": "Member height (inches)"
      }
    }

    // let chartData = () => {
    //     let array = null
    //     if (this.state.newData !== "a" ) {
    //         const record_type = {
    //             weight: "recordWeight",
    //             reps: "recordReps"
    //         }

    //         const xAxisTypes = {
    //           'age': 'userBday',
    //           'weight': 'userBodyWeight',
    //           'height': 'userHeight'
    //         }
    //         array = this.state.newData.category_chart_data.map(obj => {
    //             let newObj = Object.assign({}, obj)
    //             newObj.y = newObj[record_type[`${obj.recordType}`]]
    //             newObj.x = newObj[xAxisTypes[this.state.xAxis]]
    //             if (xAxisTypes[this.state.xAxis] === 'userBday') {
    //               newObj.x = parseInt(moment().diff(newObj.x, 'years')) 
    //             }
    //             return newObj
    //         })
    //         // filter the data points based on gender e.g. male / female 
    //         if (this.state.filterGender !== '') {
    //           array = array.filter(obj => obj.userGender === this.state.filterGender)
    //         }
    //     }
    //     return array
    // }
    let chartData = () => {
      // debugger;
      let array = null

      const yAxisTypes = {
        'weight': 'weight_lb',
        'fatPerc': 'body_fat_perc',
        'muscPerc': 'body_muscle_perc'
      }

      array = this.props.userData.weight_info.map(obj => {
        let newObj = Object.assign({}, obj)
        newObj.y = newObj[yAxisTypes[this.state.yAxis]]
        newObj.x = new Date(newObj.weigh_date);
        newObj.color = this.props.userData.user_info.primary_color
        newObj.stroke = this.props.userData.user_info.secondary_color
        return newObj
      })
      // filter the data points based on gender e.g. male / female 

      // }
      return array
    }
    // console.log(chartData())

    const chartSize = window.innerWidth * 0.50

    let customHint = () => {
      const hintData = this.state.hintData

      return (<Hint value={hintData}>
                <div className="rv-hint__content">
                  {/* <h2 className="myHintTitle">{`${hintData.user}`}</h2> */}
                  <div>
                    <span className="rv-hint__title">Date</span>
                    {': '}
                    <span className="rv-hint__value">{hintData.date}</span>
                  </div>
                  <div>
                    <span className="rv-hint__title">Record</span>
                    {': '}
                    <span className="rv-hint__value">{hintData.record}</span>
                  </div>
                </div>
              </Hint>)
    }

    return (
      <div>
        <Card className='myCard'>
          <CardHeader title={this.state.categoryTitle} classes={{ content: 'centerTitle' }}/>

          <XYPlot height={chartSize} width={chartSize} xType='time'>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis 
              title="Date of Record"
              tickLabelAngle={-45}
              tickFormat={v => moment(v).format('MM/DD/YY')}
              tickSize={-1}
            />
            <YAxis title={axisLabels.yAxisLabels[this.state.yAxis]}/>
            <LineMarkSeries 
                animation={true}
                opacityType={'literal'}
                colorType='literal'
                strokeType='literal'
                data={this.state.propDataLoaded === true ? chartData() : [{x:0,y:0}] }
                className="mark-series-example"
                strokeWidth={2}
                opacity="0.7"
                sizeRange={[5, 30]}
                curve={'curveMonotoneX'}
                onNearestXY={value => this.setState({hintData: this.filterHintData(value)})}
            />
            {/* {this.state.hintData ? <Hint value={this.state.hintData} /> : null} */}
            {this.state.hintData ? customHint() : null}
          </XYPlot>

          <CardActions classes={{root: 'cardActionButtons'}}>
            <form className={classes.root} autoComplete='off'>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Y Axis:</InputLabel>
                <Select
                  value={this.state.yAxis}
                  onChange={this.handleChangeYAxis}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value={'weight'}>Weight (lbs)</MenuItem>
                  <MenuItem value={'fatPerc'}>Body Fat Percent</MenuItem>
                  <MenuItem value={'muscPerc'}>Body Muscle Percent</MenuItem>
                </Select>
              </FormControl>
              {/* <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Filter M/F:</InputLabel>
                <Select
                  value={this.state.filterGender}
                  onChange={this.handleChangeFilterGender}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'f'}>Female</MenuItem>
                  <MenuItem value={'m'}>Male</MenuItem>
                </Select>
              </FormControl> */}
            </form>

          </CardActions>
        </Card>


      </div>
    )
  }
}

WeightChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeightChart);