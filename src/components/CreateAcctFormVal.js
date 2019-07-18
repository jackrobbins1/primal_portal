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

    // const [first_name, handleFirstName] = useState("");
    // const [last_name, handleLastName] = useState("");
    // const [email, handleEmail] = useState("");
    // const [username, handleUsername] = useState("");
    // const [password_digest, handlePassword] = useState("");
    
    const {
      values: { first_name, last_name, email, username, password_digest, confirmPassword },
      errors,
      touched,
      handleSubmit,
      handleChange,
      isValid,
      setFieldTouched
    } = props;
    // console.table(props);

    const change = (name, e) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };

  return (
    // <form className={classes.form} noValidate onSubmit={handleSubmit}>
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"

            value={email}
            onChange={change.bind(null, "email")}

            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="password_digest"
            label="Password"
            type="password"

            value={password_digest}
            onChange={change.bind(null, "password_digest")}

            helperText={touched.password_digest ? errors.password_digest : ""}
            error={touched.password_digest && Boolean(errors.password_digest)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"

            value={confirmPassword}
            onChange={change.bind(null, "confirmPassword")}

            helperText={touched.confirmPassword ? errors.confirmPassword : ""}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={!isValid}
      >
        Sign Up
      </Button>

    </form>
  );
}