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
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                value={first_name}
                onChange={e => handleFirstName(e.target.value)}
                error={first_name === ""}
                helperText={first_name === "" ? 'Empty field!' : ' '}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                value={last_name}
                onChange={e => handleLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => handleEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={e => handleUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_digest"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password_digest}
                onChange={e => handlePassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitForm}
          >
            Sign Up
          </Button>

        </form>
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