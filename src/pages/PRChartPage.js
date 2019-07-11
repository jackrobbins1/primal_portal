import { statement } from "@babel/template";

import React, { Component } from 'react';
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

// my components

import CategoryChartt from '../components/CategoryChartt'
import CategoryChartPersonal from '../components/CategoryChartPersonal'




const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: '90vw',
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
});

class PRChartPage extends Component {
  state = {
    prCategoryID: "",
    name: "hai",
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
        prCategoryID: this.props.match.params.catId,
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

//   handleChange = name => event => {
//     this.setState({ [name]: event.target.value });
//   };

  handleChange = event => {
    this.setState({ prCategoryID: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
        <div className='centerContainer'>
            <div className={classes.root}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                      ref={ref => {
                      this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                  >
                      PR Category
                  </InputLabel>
                  <Select
                      value={this.state.prCategoryID}
                      onChange={this.handleChange}
                      input={
                      <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="age"
                          id="outlined-age-simple"
                      />
                      }
                  >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Turkish Getup</MenuItem>
                    <MenuItem value={2}>Jump Rope: Double Under</MenuItem>
                    <MenuItem value={3}>Pull-Ups</MenuItem>
                    <MenuItem value={4}>Chin-Ups</MenuItem>
                    <MenuItem value={5}>Push-Ups</MenuItem>
                    <MenuItem value={6}>Farmer-Carry</MenuItem>
                    <MenuItem value={7}>Simple and Sinister</MenuItem>
                  </Select>
                </FormControl>
            </div>

            <h5>All CPG Members</h5>
            <CategoryChartt
              prCategoryID={this.state.prCategoryID}
              userID={this.props.userID}
              fetchNewData={this.props.fetchNewData}
            //  prCategoryID={this.state.prCategoryID === "" ? 1 : this.state.prCategoryID}
             />

            <h5>My Personal Records</h5>
            <CategoryChartPersonal 
              userData={this.props.userData}
              prCategoryID={this.state.prCategoryID}
              fetchNewData={this.props.fetchNewData}
            />
        </div>
      
    );
  }
}

PRChartPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PRChartPage);
