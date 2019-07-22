import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import LoginFormVal from './LoginFormVal';

import { Formik } from 'formik';
import { object, string } from 'yup';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function LoginFormContainer(props) {
    const classes = useStyles();

    const submitLogin = data => {
        const url = `http://localhost:3000/api/v1/users/login`
        
        let bodyData = {login:{
                        username: data.username,
                        password_digest: data.password_digest
                        }
                    }
    
        // data.record.weight = parseFloat(data.record.weight);
    
        const fetchHeaders = {
            "Content-Type": "application/json"
        }
    
        fetch(url, {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers: fetchHeaders
        })
        .then(resp => resp.json())
        .then(result => {
            console.log("result: ", result)
            setTimeout( () => {
                props.setLogin(result)
            }, 400)
        })
        .catch(error => {
            alert(error)
        })
    }

        // Yup schema used to validate input into formik form
        const validationSchema = object({
            username: string("Enter a username")
                .required("Username is required")
                .trim(),
            password_digest: string("")
                .required("Enter your password"),
        });
    
        // Values for formik form
        const values = { username: '', password_digest: '' };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik
                render={props => <LoginFormVal {...props} />}
                initialValues={values}
                validationSchema={validationSchema}
                onSubmit={submitLogin}
            />
        </div>

        </Container>
    );
}