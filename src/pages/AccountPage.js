import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

import ColorPicker from '../components/ColorPicker'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
// import PropTypes, { number } from 'prop-types';
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

import AccountPageForm from '../components/AccountPageForm';

import { Formik } from 'formik';
import { object, string, boolean, number } from 'yup';

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

class AccountPage extends PureComponent{
    constructor(props) {
        super(props)

        this.state = {        
            successMsgOpen: false
        }
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

    submitForm = data => {
        const url = `http://localhost:3000/api/v1/users`
        let bodyData = Object.assign({}, {user:{...data}})
        // code below is converting ft and inch units to just inches
        bodyData.user.height = ((parseInt(this.state.heightFt) * 12) + parseInt(this.state.heightIn))

        delete bodyData.user.heightFt;
        delete bodyData.user.heightIn;
        delete bodyData.user.selectedDate;

        const fetchHeaders = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }

        fetch(url, {
            method: "PATCH",
            body: JSON.stringify(bodyData),
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
        const nickNameKey = {
            "pseudo name": true,
            "t": true,
            "f": false,
            "full name": false,
            "only me": false
        }
        const userInfo = this.props.userData.user_info
        const values = { 
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
            share_all_prs: userInfo.share_all_prs,
            share_age: userInfo.share_age,
            share_height: userInfo.share_height,
            share_weight: userInfo.share_weight,
        };

        const validationSchema = object({
            first_name: string("Enter a name")
                .required("First name is required")
                .trim()
                .matches(/^[a-zA-Z '\-]+$/, "Only letters", { excludeEmptyString: true }),
            last_name: string("Enter a name")
                .required("Last name is required")
                .trim()
                .matches(/^[a-zA-Z '\-]+$/, "Only letters", { excludeEmptyString: true }),
            username: string("Enter a username")
                .required("Username is required")
                .trim(),
            pseudonym: string().trim(),
            pr_visibility: boolean(),
            primary_color: string(),
            secondary_color: string(),
            heightFt: number()
                .positive("Number must be positive")
                .integer("Number can't have decimals"),
            heightIn: number()
                .positive("Number must be positive")
                .integer("Number can't have decimals"),
            share_all_prs: boolean(),
            share_age: boolean(),
            share_height: boolean(),
            share_weight: boolean(),
        });

    return (
    <div className="centerContainer accountPaddingBottom">

        <h2>My Account</h2>

        <Formik
            render={props => <AccountPageForm {...props} />}
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={this.submitForm}
        />

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


export default (AccountPage);