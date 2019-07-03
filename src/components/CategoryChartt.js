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
  }

  // componentDidMount() {
  //     fetch(`http://localhost:3000/api/v1/pr_categories/${this.props.prCategoryID}`)
  //     .then(resp => resp.json())
  //     .then(data => {
  //         this.setState({newData: data})
  //     })
  // }

  componentWillReceiveProps(nextProps) {
    fetch(`http://localhost:3000/api/v1/pr_categories/${nextProps.prCategoryID}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({newData: data})
    })
  }

  filterHintData = data => {

    const record_type = {
      weight: "recordWeight",
      reps: "recordReps"
    }
    let newData = {
        // User: this.capital_letter(data.userPseudo),
        User: data.userPseudo,
        x: data.userBodyWeight,
        y: data[record_type[`${data.recordType}`]],
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


  render() {

    const { classes } = this.props;

    let chartData = () => {
        let array = null
        if (this.state.newData !== "a" ) {
            const record_type = {
                weight: "recordWeight",
                reps: "recordReps"
            }
            array = this.state.newData.category_chart_data.map(obj => {
                let newObj = Object.assign({}, obj)
                newObj.y = newObj[record_type[`${obj.recordType}`]]
                newObj.x = newObj.userBodyWeight
                return newObj
            })
        }
        // debugger;
        return array
    }

    const chartSize = window.innerWidth * 0.50

    return (
      <div>
        <Card className='myCard'>
          <CardHeader title='Turkish Getup Records' classes={{ content: 'centerTitle' }}/>

          <XYPlot height={chartSize} width={chartSize}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
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
              {/* <Button size="small" color="primary">
                  Add Turkish Getup PR
              </Button>
              <Button size="small" color="primary">
                  View Record
              </Button> */}
            <form className={classes.root} autoComplete='off'>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">X Axis:</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'age'}>Age</MenuItem>
                  <MenuItem value={'weight'}>Weight</MenuItem>
                  <MenuItem value={'height'}>Height</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">X Axis:</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'age'}>Age</MenuItem>
                  <MenuItem value={'weight'}>Weight</MenuItem>
                  <MenuItem value={'height'}>Height</MenuItem>
                </Select>
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