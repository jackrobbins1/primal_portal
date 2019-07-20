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

import { Formik } from 'formik';
import { object, number } from 'yup';

import AddPrForm from './AddPrForm';

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

    handleFormSubmit = data => {
        const url = `http://localhost:3000/api/v1/records`
    
        let bodyData = Object.assign({}, {record:{...data}})
    
        // data.record.weight = parseFloat(data.record.weight);
    
        const fetchHeaders = {
            "Content-Type": "application/json"
        }

        console.log(data)
    
        // fetch(url, {
        //     method: "POST",
        //     body: JSON.stringify(bodyData),
        //     headers: fetchHeaders
        // })
        // .then(resp => resp.json())
        // .then(result => {
        //     console.log("result: ", result)
        //     this.handleSuccessDialog()
        //     this.handleClose()
        //     this.props.fetchNewData()
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }

    render() {
        const { classes } = this.props;

        const validationSchema = object({
            weight: number()
                // .required("Weight is a required field")
                .positive("Number must be positive")
                .integer("Number can't have decimals"),
            reps: number()
                // .required("Reps is a required field")
                .positive("Number must be positive")
                .integer("Number can't have decimals"),
            minutes: number()
                // .required("Minutes is a required field")
                .integer("Number can't have decimals"),
            seconds: number()
                // .required("Seconds is a required field")
                .integer("Number can't have decimals"),
        });

        const values = {
            pr_category_id: this.props.prCategoryID,
            weight: '',
            reps: '',
            minutes: '',
            seconds: '',
            date: '',
            selectedDate: moment()
        }

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
                    <Formik
                        render={props => <AddPrForm {...props} handleClose={this.handleClose} categoryList={this.props.categoryList} />}
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
