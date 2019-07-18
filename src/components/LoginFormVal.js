import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginFormVal(props) {
    const classes = useStyles();
    
    const {
      values: {  username, password_digest },
      errors,
      touched,
      handleSubmit,
      handleChange,
      isValid,
      setFieldTouched
    } = props;
    console.table(props);

    const change = (name, e) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus

            value={username}
            onChange={change.bind(null, "username")}

            helperText={touched.username ? errors.username : ""}
            error={touched.username && Boolean(errors.username)}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password_digest"
            label="Password"
            type="password"

            value={password_digest}
            onChange={change.bind(null, "password_digest")}

            helperText={touched.password_digest ? errors.password_digest : ""}
            error={touched.password_digest && Boolean(errors.password_digest)}
        />
        {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
        /> */}
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid}
        >
        Sign In
        </Button>
        <Grid container>
            <Grid item xs>
                <Link href="#" variant="body2">
                Forgot password?
                </Link>
            </Grid>

        </Grid>
    </form>
  );
}