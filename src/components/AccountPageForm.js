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
import Grid from '@material-ui/core/Grid';

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
import { createSocket } from 'dgram';

const moment = require('moment');

// const styles = theme => ({
//     root: {
//         width: '100%',
//         maxWidth: 360,
//     },
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     formControl: {
//     //   margin: theme.spacing.unit,
//       margin: theme.spacing(1),
//     },
//     formControlLabel: {
//         fontSize: '12px',
//     }
// });

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 450,
        [theme.breakpoints.down('xs')]: {
            maxWidth: '95vw',
            margin: '0 auto'
        }
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    radioGroup: {
        margin: '0 auto'
    }
}));

export default function AccountPageForm(props) {
    const classes = useStyles();

    const {
        values: {
            username,
            first_name,
            last_name,
            pseudonym,
            pr_visibility,
            primary_color,
            secondary_color,
            selectedDate,
            birthday,
            heightFt,
            heightIn,
            share_all_prs,
            share_age,
            share_height,
            share_weight
            },
        errors,
        status,
        touched,
        handleSubmit,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue,
        setStatus
    } = props;

    const change = (name, e) => {
        setStatus({SubmitNoChange: false})
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    // handleColorChange = (colorHex, inputType) => {
    //     setValues({inputType: colorHex})
    // }
    const handleColorChange = (colorHex, inputType) => {
        setStatus({SubmitNoChange: false})
        setFieldValue(inputType, colorHex, false)
    }

    const handleDateChange = date => {
        setStatus({SubmitNoChange: false})
        setFieldValue('selectedDate', date, false)
        setFieldValue('birthday', moment(date).format("YYYY-MM-DD"), false)
    }

    const handleRadioInput = event => {
        setStatus({SubmitNoChange: false})
        const myValue = {
            'true': true,
            'false': false
        }
        // this.setState({
        //     [event.target.name]: myValue[event.target.value]
        // })
        setFieldValue([event.target.name], myValue[event.target.value], false)
    }

    const handleSwitchInput = event => {
        setStatus({SubmitNoChange: false})
        const myValue = {
            'true': false,
            'false': true
        }
        // this.setState({
        //     [event.target.name]: myValue[event.target.value]
        // })
        setFieldValue([event.target.name], myValue[event.target.value], false)

    }

    const clickedSubmit = e => {
        e.preventDefault()
        handleSubmit()
        setStatus({SubmitNoChange: true})
    }

    return (
        <form onSubmit={clickedSubmit} className={classes.root}>
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        label="Username"
                        name="username"
            
                        value={username}
                        onChange={change.bind(null, "username")}
            
                        helperText={touched.username ? errors.username : ""}
                        error={touched.username && Boolean(errors.username)}
                    />
                </Grid>
                <Grid item sm={6} xs={6}>
                    <TextField 
                        autoComplete="fname"
                        name="first_name"
                        variant="outlined"
                        fullWidth
                        label="First Name"

                        value={first_name}
                        onChange={change.bind(null, "first_name")}

                        helperText={touched.first_name ? errors.first_name : ""}
                        error={touched.first_name && Boolean(errors.first_name)}
                    />
                </Grid>
                <Grid item sm={6} xs={6}>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        autoComplete="lname"

                        value={last_name}
                        onChange={change.bind(null, "last_name")}

                        helperText={touched.last_name ? errors.last_name : ""}
                        error={touched.last_name && Boolean(errors.last_name)}
                    />
                </Grid>

                <Divider className="myDivider" />

                <h3 className="mySectionHeader">Personal Record Settings</h3>

                <Grid item sm={6} xs={6}>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        label="Nickname"
                        name="pseudonym"
                        autoComplete="lname"

                        value={pseudonym}
                        onChange={change.bind(null, "pseudonym")}

                        helperText={touched.pseudonym ? errors.pseudonym : ""}
                        error={touched.pseudonym && Boolean(errors.pseudonym)}
                    />
                </Grid>
                <Grid item sm={6} xs={6}>
                    <FormControl component="fieldset">
                            {/* <FormLabel component="legend">Show nickname on charts instead of full name?</FormLabel> */}
                            <FormLabel className="switchLabel">Show nickname on charts instead of full name?</FormLabel>
                            <FormControlLabel
                                control={
                                    <Switch
                                    className="mySwitch"
                                    name="pr_visibility"
                                    checked={pr_visibility}
                                    onChange={handleSwitchInput}
                                    value={pr_visibility}
                                    color="primary"
                                    />
                                }
        
                            />
                    </FormControl>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <div className="myLabelFont">Data Point Primary Color:</div>
                    <ColorPicker id="primary_color" type="primary_color" handleColorChange={handleColorChange} currentColor={primary_color} />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <div className="myLabelFont">Data Point Outline Color:</div>
                    <ColorPicker id="secondary_color" type="secondary_color" handleColorChange={handleColorChange} currentColor={secondary_color} />
                </Grid>

                <Divider className="myDivider" />

                <h3 className="mySectionHeader">Personal Details</h3>

                <Grid item item xs={12} sm={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <DatePicker
                            disableFuture
                            format="MM-dd-yyyy"
                            className="myDatePicker"
                            label="Birthday"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        label="Feet"
                        name="heightFt"
                        type="number"

                        value={heightFt}
                        onChange={change.bind(null, "heightFt")}

                        helperText={touched.pseudonym ? errors.heightFt : ""}
                        error={touched.heightFt && Boolean(errors.heightFt)}
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        label="Inches"
                        name="heightIn"
                        type="number"

                        value={heightIn}
                        onChange={change.bind(null, "heightIn")}

                        helperText={touched.heightIn ? errors.heightIn : ""}
                        error={touched.heightIn && Boolean(errors.heightIn)}
                    />
                </Grid>

                <Divider className="myDivider" />

                <h3 className="mySectionHeader">Privacy Settings</h3>
                
                <Grid item sm={12} className={classes.radioGroup}>
                    <div className="myLabelFont">Visibility of your personal records:</div>
                    <RadioGroup
                        className="privacyRadioGroup"
                        aria-label="position"
                        name="share_all_prs"
                        value={share_all_prs.toString()}
                        onChange={handleRadioInput}
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
                </Grid>
                <Grid item sm={12} className={classes.radioGroup}>
                    <div className="myLabelFont">Visibility of your age:</div>

                    <RadioGroup
                        className="privacyRadioGroup"
                        aria-label="position"
                        name="share_age"
                        value={share_age.toString()}
                        onChange={handleRadioInput}
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
                </Grid>
                <Grid item sm={12} className={classes.radioGroup}>
                    <div className="myLabelFont">Visibility of your height:</div>

                    <RadioGroup
                        className="privacyRadioGroup"
                        aria-label="position"
                        name="share_height"
                        value={share_height.toString()}
                        onChange={handleRadioInput}
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
                </Grid>
                <Grid item sm={12} className={classes.radioGroup}>
                    <div className="myLabelFont">Visibility of your weight:</div>

                    <RadioGroup
                        className="privacyRadioGroup"
                        aria-label="position"
                        name="share_weight"
                        value={share_weight.toString()}
                        onChange={handleRadioInput}
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
                </Grid>
                
            </Grid>

            <div className="floatingButtonsContainer">
                <div>
                    <Button component={Link} to="/" className="floatingButtons left" variant="contained">Cancel</Button>
                    <Button type="submit" disabled={!isValid || status.SubmitNoChange} className="floatingButtons right" variant="contained" color="primary">Save</Button>
                </div>
            </div>

        </form>
    )
}


