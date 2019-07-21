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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputAdornment from '@material-ui/core/InputAdornment';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

import { Formik } from 'formik';
import { object, number } from 'yup';

import WeightChartForm from './WeightChartForm';

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
    filterGender: '',
    dialogOpen: false,
    successMsgOpen: false,
    newWeightForm: {
      user_id: null,
      weight_lb: null,
      body_fat_perc: null,
      body_muscle_perc: null,
      weigh_date: null
    }
  }

  componentDidMount() {
    if (this.props.userData) {
      this.setState({propDataLoaded: true})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userData) {
      this.setState({
        propDataLoaded: true,
        newWeightForm: {
          user_id: nextProps.userData.user_info.id
        }
      })
    }
  }

  filterHintData = data => {
    // debugger;

    const recordUnits = {
      'weight': 'lbs',
      'fatPerc': '%',
      'muscPerc': '%'
    }

    // const loggedInUser = this.props.userData.user_info

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

  handleFormOpen = () => {
    this.setState({dialogOpen: true})
  }

  handleFormClose = () => {
    this.setState({dialogOpen: false})
  }

  handleFormChange = event => {
    let updatedForm = Object.assign({}, {...this.state.newWeightForm})
    updatedForm[event.target.name] = event.target.value

    this.setState({
      newWeightForm: updatedForm
    })
  }

  handleFormDate = date => {
    let updatedForm = Object.assign({}, {...this.state.newWeightForm})
    updatedForm.weigh_date = moment(date).format("YYYY-MM-DD")

    this.setState({
      selectedDate: date,
      newWeightForm: updatedForm
    })
  }

  handleSuccessDialog = () => {
    this.setState({
        successMsgOpen: true
    })
    setTimeout( () => {
        this.setState({
            successMsgOpen: false
        })
    }, 1500)
  }

  handleFormSubmit = data => {
    const url = `http://localhost:3000/api/v1/weights`

    let bodyData = Object.assign({}, {weight:{...data}})

    if (!data.weigh_date) {
      bodyData.weight.weigh_date = data.selectedDate.format('YYYY-MM-DD')
    }

    bodyData.weight.user_id = this.props.userData.user_info.id
    bodyData.weight.weight_lb = parseFloat(data.weight_lb);
    bodyData.weight.body_fat_perc = (parseFloat(data.body_fat_perc) / 100);
    bodyData.weight.body_muscle_perc = (parseFloat(data.body_muscle_perc) / 100);

    if (isNaN(bodyData.weight.body_fat_perc)) {
      bodyData.weight.body_fat_perc = null
    }
    if (isNaN(bodyData.weight.body_muscle_perc)) {
      bodyData.weight.body_muscle_perc = null
    }

    delete bodyData.weight.selectedDate

    const fetchHeaders = {
        "Content-Type": "application/json"
    }

    fetch(url, {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: fetchHeaders
    })
    .then(resp => resp.json())
    .then(result => {
        console.log("result: ", result)
        this.handleSuccessDialog()
        this.handleFormClose()
        this.props.fetchNewData()
    })
    .catch(error => {
        console.log(error)
    })
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

    let chartSize = window.innerWidth * 0.53

    if (document.getElementById("coolCard")) {
      chartSize = document.getElementById("coolCard").offsetWidth * 0.98
    }

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

    const validationSchema = object({
      weight_lb: number()
          .required("Weight is a required field")
          .positive("Number must be positive"),
      body_fat_perc: number()
          .positive("Number must be positive"),
      body_muscle_perc: number()
          .positive("Number must be positive"),
    });

    const values = {
      weight_lb: '',
      body_fat_perc: '',
      body_muscle_perc: '',
      weigh_date: '',
      selectedDate: moment()
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
            
            <Button onClick={this.handleFormOpen} size="small" variant="contained" color="primary">
              Add Weight Record
            </Button>

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

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleFormClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Weight Record</DialogTitle>
          <Formik
            render={props => <WeightChartForm {...props} handleClose={this.handleFormClose} />}
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={this.handleFormSubmit}
          />
        </Dialog>

        <Dialog
          maxWidth="xs"
          open={this.state.successMsgOpen}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Success</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your weight record has been submitted.
            </DialogContentText>
          </DialogContent>
        </Dialog>

      </div>
    )
  }
}

WeightChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeightChart);