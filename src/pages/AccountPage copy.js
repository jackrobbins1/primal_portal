import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
            username: userInfo.username,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            pseudonym: userInfo.pseudonym,
            pr_visibility: nickNameKey[userInfo.pr_visibility],
            primary_color: userInfo.primary_color,
            secondary_color: userInfo.secondary_color,
            selectedDate: new Date(`${userInfo.birthday}T11:00:00-06:00`),
            birthday: userInfo.birthday,
            heightFt: Math.floor(userInfo.height / 12),
            heightIn: Math.floor(userInfo.height % 12),
            // weight: props.userData.weight_info[0],
            share_all_prs: userInfo.share_all_prs,
            share_age: userInfo.share_age,
            share_height: userInfo.share_height,
            share_weight: userInfo.share_weight,
            successMsgOpen: false
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

    handleSubmitUpdate = () => {
        const userID = this.props.userData.user_info.id
        const url = `https://pacific-brook-51476.herokuapp.com/api/v1/users/${userID}`

        let data = Object.assign({}, {user:{...this.state}})

        
        data.user.height = ((parseInt(this.state.heightFt) * 12) + parseInt(this.state.heightIn))

        delete data.user.heightFt;
        delete data.user.heightIn;
        delete data.user.selectedDate;
        delete data.user.successMsgOpen;

        const fetchHeaders = {
            "Content-Type": "application/json"
        }

        fetch(url, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: fetchHeaders
        })
        .then(resp => resp.json())
        .then(result => {
            console.log("result: ", result)
            this.handleSuccessDialog()
            this.props.fetchNewData()
        })
        .catch(error => {
            console.log(error)
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
                        value={this.state.username}
                        name="username"
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
                        value={this.state.first_name}
                        name="first_name"
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
                        value={this.state.last_name}
                        name="last_name"
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
                        value={this.state.pseudonym}
                        name="pseudonym"
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
                            name="pr_visibility"
                            checked={this.state.pr_visibility}
                            onChange={this.handleSwitchInput}
                            value={this.state.pr_visibility}
                            color="primary"
                            />
                        }
   
                    />
                </FormControl>
            </ListItem>
            <div className="myLabelFont">Data Point Primary Color:</div>
            <ListItem>
                <ColorPicker type="primary_color" handleColorChange={this.handleColorChange} currentColor={this.state.primary_color} />
            </ListItem>
            <div className="myLabelFont">Data Point Secondary Color:</div>
            <ListItem>
                <ColorPicker type="secondary_color" handleColorChange={this.handleColorChange} currentColor={this.state.secondary_color} />
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
                    name="share_all_prs"
                    value={this.state.share_all_prs.toString()}
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
                    name="share_age"
                    value={this.state.share_age.toString()}
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
                    name="share_height"
                    value={this.state.share_height.toString()}
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
                    name="share_weight"
                    value={this.state.share_weight.toString()}
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
            <Button component={Link} to="/" className="floatingButtons left" variant="contained">Cancel</Button>
            <Button onClick={this.handleSubmitUpdate} className="floatingButtons right" variant="contained" color="primary">Save</Button>
        </div>

        <Dialog
          maxWidth="xs"
          open={this.state.successMsgOpen}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Success</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your profile has been updated.
            </DialogContentText>
          </DialogContent>
        </Dialog>

    </div>
    )
  }
}

AccountPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountPage);