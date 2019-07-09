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
import TextField from '@material-ui/core/TextField';
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
    //   margin: theme.spacing.unit,
      margin: theme.spacing(1),
    },
    formControlLabel: {
        fontSize: '12px',
    }
});

class AccountPage extends PureComponent{
    constructor(props) {
        super(props)

        const userInfo = props.userData.user_info

        const nickNameKey = {
            "pseudo name": true,
            "full name": false,
            "only me": false
        }

        this.state = {        
            userName: userInfo.username,
            firstName: userInfo.first_name,
            lastName: userInfo.last_name,
            nickName: userInfo.pseudonym,
            showNickName: nickNameKey[userInfo.pr_visibility],
            primaryColor: userInfo.primary_color,
            secondaryColor: userInfo.secondary_color,
            selectedDate: new Date(`${userInfo.birthday}T11:00:00-06:00`),
            heightFt: Math.floor(userInfo.height / 12),
            heightIn: Math.floor(userInfo.height % 12),
            weight: props.userData.weight_info[0],
            shareAllPrs: userInfo.share_all_prs,
            shareAge: userInfo.share_age,
            shareHeight: userInfo.share_height,
            shareWeight: userInfo.share_weight
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

    handleRadioInput = event => {
        const myValue = {
            'true': true,
            'false': false
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
        //   debugger;
        this.setState({
            selectedDate: date,
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
                        fullWidth
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
                <ColorPicker type="primaryColor" handleColorChange={this.handleColorChange} currentColor={this.state.primaryColor} />
            </ListItem>
            <div className="myLabelFont">Data Point Secondary Color:</div>
            <ListItem>
                <ColorPicker type="secondaryColor" handleColorChange={this.handleColorChange} currentColor={this.state.secondaryColor} />
            </ListItem>

        </List>

        <Divider className="myDivider" />

        <h3>Personal Details</h3>

        <List className={classes.root}>

            <ListItem className="myDatePicker">
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <DatePicker
                        disableFuture
                        format="MM-dd-yyyy"
                        margin="normal"
                        label="Birthday"
                        value={this.state.selectedDate}
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
                        value={this.state.heightFt}
                        name="heightFt"
                        onChange={this.handleUserInput}
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
                        value={this.state.heightIn}
                        name="heightIn"
                        onChange={this.handleUserInput}
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
            {/* <div className="myLabelFont">Are you a parent?</div>
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
            </ListItem> */}
        </List>

        <Divider className="myDivider" />

        <h3>Privacy Settings</h3>

        <List className={classes.root}>
            <div className="myLabelFont">Visibility of your personal records:</div>
            <ListItem className="myDatePicker">
                <RadioGroup
                    aria-label="position"
                    name="shareAllPrs"
                    value={this.state.shareAllPrs.toString()}
                    onChange={this.handleRadioInput}
                    row
                >
                    <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Share with others</Typography>}
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="false"
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
                    name="shareAge"
                    value={this.state.shareAge.toString()}
                    onChange={this.handleRadioInput}
                    row
                >
                    <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Share with others</Typography>}
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="false"
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
                    name="shareHeight"
                    value={this.state.shareHeight.toString()}
                    onChange={this.handleRadioInput}
                    row
                >
                    <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Share with others</Typography>}
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="false"
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
                    name="shareWeight"
                    value={this.state.shareWeight.toString()}
                    onChange={this.handleRadioInput}
                    row
                >
                    <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Share with others</Typography>}
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="false"
                        control={<Radio color="primary" />}
                        label={<Typography className={classes.formControlLabel}>Only I can view</Typography>}
                        labelPlacement="top"
                    />
                </RadioGroup>
            </ListItem>
            {/* <div className="myLabelFont">Share that you are a parent:</div>
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
            </ListItem> */}

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