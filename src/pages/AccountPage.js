import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ColorPicker from '../components/ColorPicker'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const moment = require('moment');

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
    },
    formControlLabel: {
        fontSize: '12px',
    }
});

class AccountPage extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
      userData: props.userData,
      showNickName: true,
    }
  }

  handleUserInput = event => {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  handleSwitchInput = event => {
      const myValue = {
          'true': false,
          'false': true
      }
      this.setState({
        [event.target.name]: myValue[event.target.value]
      })
  }

  handleColorChange = (colorHex, inputType) => {
    this.setState({
        [inputType]: colorHex
    })
  }

  handleDateChange = date => {
      debugger;
      this.setState({
          birthday: moment(date).format("YYYY-MM-DD")
      })
  }

  render() {

    const { classes } = this.props;

    return (
    <div className="centerContainer accountPaddingBottom">

        <h2>My Account</h2>

        <List className={classes.root}>
            <ListItem>
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel
                        ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="component-outlined"
                    >
                        Username
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={this.state.userName}
                        name="userName"
                        onChange={this.handleUserInput}
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                </FormControl>
            </ListItem>
            <ListItem>
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel
                        ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="component-outlined"
                    >
                        First Name
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={this.state.firstName}
                        name="firstName"
                        onChange={this.handleUserInput}
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                </FormControl>
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel
                        ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="component-outlined"
                    >
                        Last Name
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={this.state.lastName}
                        name="lastName"
                        onChange={this.handleUserInput}
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                </FormControl>
            </ListItem>
        </List>

        <Divider className="myDivider" />

        <h3>Personal Record Settings</h3>

        <List className={classes.root}>
            <ListItem>
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel
                        ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="component-outlined"
                    >
                        Nickname
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={this.state.nickName}
                        name="nickName"
                        onChange={this.handleUserInput}
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                </FormControl>
                <FormControl component="fieldset">
                    {/* <FormLabel component="legend">Show nickname on charts instead of full name?</FormLabel> */}
                    <FormLabel className="switchLabel">Show nickname on charts instead of full name?</FormLabel>
                    <FormControlLabel
                        control={
                            <Switch
                            className="mySwitch"
                            name="showNickName"
                            checked={this.state.showNickName}
                            onChange={this.handleSwitchInput}
                            value={this.state.showNickName}
                            color="primary"
                            />
                        }
   
                    />
                </FormControl>
            </ListItem>
            <div className="myLabelFont">Data Point Primary Color:</div>
            <ListItem>
                <ColorPicker type="primaryColor" handleColorChange={this.handleColorChange} />
            </ListItem>
            <div className="myLabelFont">Data Point Secondary Color:</div>
            <ListItem>
                <ColorPicker type="secondaryColor" handleColorChange={this.handleColorChange} />
            </ListItem>

        </List>

        <Divider className="myDivider" />

        <h3>Personal Details</h3>

        <List className={classes.root}>

            <ListItem className="myDatePicker">
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <DatePicker
                        margin="normal"
                        label="Birthday"
                        value={this.state.birthday}
                        onChange={this.handleDateChange}
                    />
                </MuiPickersUtilsProvider>
            </ListItem>
            <div className="myLabelFont">Height:</div>
            <ListItem>
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel
                        ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="component-outlined"
                    >
                        Feet
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={this.state.name}
                        onChange={this.handleChange}
                        type="number"
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                </FormControl>
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel
                        ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="component-outlined"
                    >
                        Inches
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={this.state.name}
                        onChange={this.handleChange}
                        type="number"
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                </FormControl>
            </ListItem>
            <div className="myLabelFont">Weight:</div>
            <ListItem className="myDatePicker">
                <Button variant="outlined" className="myWeightButton">
                    Record Weight For Today
                </Button>
            </ListItem>
            <div className="myLabelFont">Are you a parent?</div>
            <ListItem className="myDatePicker">
                <RadioGroup
                    aria-label="position"
                    name="position"
                    value={this.state.value}
                    onChange={this.handleChange}
                    row
                >
                    <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="Yes"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label="No"
                        labelPlacement="top"
                    />
                </RadioGroup>
            </ListItem>
        </List>

        <Divider className="myDivider" />

        <h3>Privacy Settings</h3>

        <List className={classes.root}>
            <div className="myLabelFont">Visibility of your personal records:</div>
            <ListItem className="myDatePicker">
                <RadioGroup
                    aria-label="position"
                    name="position"
                    value={this.state.value}
                    onChange={this.handleChange}
                    row
                >
                    <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Share with others</Typography>}
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Only I can view</Typography>}
                        labelPlacement="top"
                    />
                </RadioGroup>
            </ListItem>

            <div className="myLabelFont">Visibility of your age:</div>
            <ListItem className="myDatePicker">
                <RadioGroup
                    aria-label="position"
                    name="position"
                    value={this.state.value}
                    onChange={this.handleChange}
                    row
                >
                    <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Share with others</Typography>}
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Only I can view</Typography>}
                        labelPlacement="top"
                    />
                </RadioGroup>
            </ListItem>
            <div className="myLabelFont">Visibility of your height:</div>
            <ListItem className="myDatePicker">
                <RadioGroup
                    aria-label="position"
                    name="position"
                    value={this.state.value}
                    onChange={this.handleChange}
                    row
                >
                    <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Share with others</Typography>}
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Only I can view</Typography>}
                        labelPlacement="top"
                    />
                </RadioGroup>
            </ListItem>
            <div className="myLabelFont">Visibility of your weight:</div>
            <ListItem className="myDatePicker">
                <RadioGroup
                    aria-label="position"
                    name="position"
                    value={this.state.value}
                    onChange={this.handleChange}
                    row
                >
                    <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Share with others</Typography>}
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Only I can view</Typography>}
                        labelPlacement="top"
                    />
                </RadioGroup>
            </ListItem>
            <div className="myLabelFont">Share that you are a parent:</div>
            <ListItem className="myDatePicker">
                <RadioGroup
                    aria-label="position"
                    name="position"
                    value={this.state.value}
                    onChange={this.handleChange}
                    row
                >
                    <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Share with others</Typography>}
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Only I can view</Typography>}
                        labelPlacement="top"
                    />
                </RadioGroup>
            </ListItem>

        </List>

        <div className="floatingButtonsContainer">
            <Button className="floatingButtons left" variant="contained">Cancel</Button>
            <Button className="floatingButtons right" variant="contained" color="primary">Save</Button>
        </div>

    </div>
    )
  }
}

AccountPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountPage);