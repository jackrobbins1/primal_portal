import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CreateAcctFormVal from './CreateAcctFormVal';

import { Formik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateAcctForm(props) {
    const classes = useStyles();

    const [first_name, handleFirstName] = useState("");
    const [last_name, handleLastName] = useState("");
    const [email, handleEmail] = useState("");
    const [username, handleUsername] = useState("");
    const [password_digest, handlePassword] = useState("");
    
    const [submitWasClicked, handleSubmitClicked] = useState(false);

    const [successMsgOpen, handleSuccessDialog] = useState(false)

    const submitForm = () => {
        handleSubmitClicked(true)
        
        const url = `http://localhost:3000/api/v1/users`
        
        let data = {user:{
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        username: username,
                        password_digest: password_digest
                        }
                    }

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
            handleSuccessDialog(true)
            setTimeout( () => {
                handleSuccessDialog(false)
                props.handleChangeIndex(0)
            }, 1500)
        })
        .catch(error => {
            console.log(error)
        })
    }

    // Yup validation object for formik
    const validationSchema = Yup.object({
        name: Yup.string("Enter a name").required("Name is required"),
        email: Yup.string("Enter your email")
          .email("Enter a valid email")
          .required("Email is required"),
        password: Yup.string("")
          .min(8, "Password must contain atleast 8 characters")
          .required("Enter your password"),
        confirmPassword: Yup.string("Enter your password")
          .required("Confirm your password")
          .oneOf([Yup.ref("password")], "Password does not match")
    });

    // Values for formik form
    const values = { first_name, last_name, email, username, password_digest, confirmPassword };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <Formik
                render={props => <CreateAcctFormVal {...props} />}
                initialValues={values}
                validationSchema={validationSchema}
                onSubmit={submitForm}
            />
        </div>

        <Dialog
            maxWidth="xs"
            open={successMsgOpen}
            aria-labelledby="max-width-dialog-title"
            >
            <DialogTitle id="max-width-dialog-title">Your account has been created</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please sign in.
                </DialogContentText>
            </DialogContent>
        </Dialog>
        </Container>
    );
}