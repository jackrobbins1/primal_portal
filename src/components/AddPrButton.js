import React, {Component} from 'react';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const moment = require('moment');

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: '100%',
    },
    formInput: {
        margin: theme.spacing.unit,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
});

class AddPrButton extends Component {
    state = {
        open: false,
        successMsgOpen: false,
        newPersonalRecordForm: {
            user_id: this.props.userID,
            pr_category_id: this.props.prCategoryID,
            weight_reps_or_time_based: null,
            weight: null,
            reps: null,
            time_length: null,
            date: null,
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.prCategoryID !== this.state.newPersonalRecordForm.pr_category_id){
            let updatedForm = Object.assign({}, {...this.state.newPersonalRecordForm})
            updatedForm.pr_category_id = nextProps.prCategoryID
            this.setState({
                newPersonalRecordForm: updatedForm
            })
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        let updatedForm = Object.assign({}, {...this.state.newPersonalRecordForm})
        updatedForm[event.target.name] = event.target.value
    
        this.setState({
            newPersonalRecordForm: updatedForm
        })
    }

    handleFormChange = event => {
        let updatedForm = Object.assign({}, {...this.state.newPersonalRecordForm})
        updatedForm[event.target.name] = event.target.value
    
        this.setState({
            newPersonalRecordForm: updatedForm
        })
    }

    handleFormDate = date => {
        let updatedForm = Object.assign({}, {...this.state.newPersonalRecordForm})
        updatedForm.date = moment(date).format("YYYY-MM-DD")
    
        this.setState({
          selectedDate: date,
          newPersonalRecordForm: updatedForm
        })
    }

    dynamicForm = categoryType => {
        let categoryId = this.state.newPersonalRecordForm.pr_category_id

        const result = this.props.categoryList[categoryId].weight_reps_or_time_based.includes(categoryType)
        return result
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

    handleFormSubmit = () => {
        const url = `http://localhost:3000/api/v1/records`
    
        let data = Object.assign({}, {record:{...this.state.newPersonalRecordForm}})
    
        // data.record.weight = parseFloat(data.record.weight);
    
        const fetchHeaders = {
            "Content-Type": "application/json"
        }
    
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: fetchHeaders
        })
        .then(resp => resp.json())
        .then(result => {
            console.log("result: ", result)
            this.handleSuccessDialog()
            this.handleClose()
            this.props.fetchNewData()
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        const { classes } = this.props;

        return (
        <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                Add PR
            </Button>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Personal Record</DialogTitle>
                <DialogContent>
                    <List className={classes.root}>
                        <ListItem>
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
                                    value={this.state.newPersonalRecordForm.pr_category_id}
                                    onChange={this.handleChange}
                                    input={
                                    <OutlinedInput
                                        labelWidth={this.state.labelWidth}
                                        name="pr_category_id"
                                        id="outlined-age-simple"
                                    />
                                    }
                                >
                                    <MenuItem value={1}>Turkish Getup</MenuItem>
                                    <MenuItem value={2}>Jump Rope: Double Under</MenuItem>
                                    <MenuItem value={3}>Pull-Ups</MenuItem>
                                    <MenuItem value={4}>Chin-Ups</MenuItem>
                                    <MenuItem value={5}>Push-Ups</MenuItem>
                                    <MenuItem value={6}>Farmer-Carry</MenuItem>
                                    <MenuItem value={7}>Simple and Sinister</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            {this.dynamicForm("weight") ?
                                <FormControl className={classes.formInput} variant="outlined">
                                    <InputLabel
                                        ref={ref => {
                                        this.labelRef = ReactDOM.findDOMNode(ref);
                                        }}
                                        htmlFor="component-outlined"
                                    >
                                        Weight (kg)
                                    </InputLabel>
                                    <OutlinedInput
                                        autoFocus
                                        fullWidth
                                        id="component-outlined"
                                        value={this.state.newPersonalRecordForm.weight}
                                        name="weight"
                                        onChange={this.handleFormChange}
                                        type="number"
                                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                    />
                                </FormControl>
                                :
                                null
                            }
                            {this.dynamicForm("reps") ?
                                <FormControl className={classes.formInput} variant="outlined">
                                    <InputLabel
                                        ref={ref => {
                                        this.labelRef = ReactDOM.findDOMNode(ref);
                                        }}
                                        htmlFor="component-outlined"
                                    >
                                        Reps
                                    </InputLabel>
                                    <OutlinedInput
                                        autoFocus
                                        fullWidth
                                        id="component-outlined"
                                        value={this.state.newPersonalRecordForm.reps}
                                        name="reps"
                                        onChange={this.handleFormChange}
                                        type="number"
                                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                    />
                                </FormControl>
                                :
                                null
                            }
                            {this.dynamicForm("time") ?
                                <FormControl className={classes.formInput} variant="outlined">
                                    <InputLabel
                                        ref={ref => {
                                        this.labelRef = ReactDOM.findDOMNode(ref);
                                        }}
                                        htmlFor="component-outlined"
                                    >
                                        Time
                                    </InputLabel>
                                    <OutlinedInput
                                        autoFocus
                                        fullWidth
                                        id="component-outlined"
                                        value={this.state.newPersonalRecordForm.time_length}
                                        name="time_length"
                                        onChange={this.handleFormChange}
                                        type="number"
                                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                    />
                                </FormControl>
                                :
                                null
                            }
                        </ListItem>
                        <ListItem className="myDatePicker">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <DatePicker
                                    disableFuture
                                    format="MM-dd-yyyy"
                                    margin="normal"
                                    label="Record Date"
                                    value={this.state.selectedDate}
                                    onChange={this.handleFormDate}
                                />
                                </MuiPickersUtilsProvider>
                        </ListItem>
                            {/* <FormControl className={classes.formControl} variant="outlined">
                                <InputLabel
                                    ref={ref => {
                                    this.labelRef = ReactDOM.findDOMNode(ref);
                                    }}
                                    htmlFor="component-outlined"
                                >
                                    Weight (lbs)
                                </InputLabel>
                                <OutlinedInput
                                    autoFocus
                                    fullWidth
                                    id="component-outlined"
                                    value={this.state.newWeightForm.weight_lb}
                                    name="weight_lb"
                                    onChange={this.handleFormChange}
                                    type="number"
                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                />
                            </FormControl>
                            <div className="addMargin">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <DatePicker
                                    disableFuture
                                    format="MM-dd-yyyy"
                                    margin="normal"
                                    label="Weigh Date"
                                    value={this.state.selectedDate}
                                    onChange={this.handleFormDate}
                                />
                                </MuiPickersUtilsProvider>
                            </div>
                        </ListItem>
                        <ListItem>
                            <FormControl className={classes.formControl} variant="outlined">
                                <InputLabel
                                    ref={ref => {
                                    this.labelRef = ReactDOM.findDOMNode(ref);
                                    }}
                                    htmlFor="component-outlined"
                                >
                                    Body Fat Percent
                                </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="component-outlined"
                                    value={this.state.newWeightForm.body_fat_perc}
                                    name="body_fat_perc"
                                    onChange={this.handleFormChange}
                                    type="number"
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
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
                                    Body Muscle Percent
                                </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="component-outlined"
                                    value={this.state.newWeightForm.body_muscle_perc}
                                    name="body_muscle_perc"
                                    onChange={this.handleFormChange}
                                    type="number"
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                />
                            </FormControl> */}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleFormSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                maxWidth="xs"
                open={this.state.successMsgOpen}
                aria-labelledby="max-width-dialog-title"
                >
                <DialogTitle id="max-width-dialog-title">Success</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your personal record has been submitted.
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        </div>
        );
    }
}

AddPrButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPrButton);
