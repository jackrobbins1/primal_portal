import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';


import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const moment = require('moment');

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

export default function AddPrForm(props) {
    const classes = useStyles();

    const [disableButton, handleDisableButton] = useState(true)

    const {
        values: {
            weight_lb,
            body_fat_perc,
            body_muscle_perc,
            date,
            selectedDate
        },
        errors,
        status,
        touched,
        handleSubmit,
        handleChange,
        isValid,
        setFieldTouched,
        setFieldValue,
    } = props;

    const inputLabel = React.useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);

    const handleFormDate = newDate => {
        const formattedDate = moment(newDate).format("YYYY-MM-DD")
    
        setFieldValue('selectedDate', newDate, false)
        setFieldValue('date', formattedDate, false)
    }


    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };


    return (
        <React.Fragment>
            <DialogContent>
                <form>
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={6}>
                            <TextField 
                                autoFocus
                                name="weight_lb"
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="Weight (lbs)"

                                value={weight_lb}
                                onChange={change.bind(null, "weight_lb")}

                                helperText={touched.weight_lb ? errors.weight_lb : ""}
                                error={touched.weight_lb && Boolean(errors.weight_lb)}
                            />
                        </Grid>
                        <Grid item sm={6} xs={6}>
                            <div className="addMargin">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <DatePicker
                                    disableFuture
                                    format="MM-dd-yyyy"
                                    label="Weigh Date"
                                    value={selectedDate}
                                    onChange={handleFormDate}
                                />
                                </MuiPickersUtilsProvider>
                            </div>
                        </Grid>
                        <Grid item sm={6} xs={6}>
                            <TextField 
                                autoFocus
                                name="body_fat_perc"
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="Body Fat Percent"
                                endAdornment={<InputAdornment position="end">%</InputAdornment>}

                                value={body_fat_perc}
                                onChange={change.bind(null, "body_fat_perc")}

                                helperText={touched.body_fat_perc ? errors.body_fat_perc : ""}
                                error={touched.body_fat_perc && Boolean(errors.body_fat_perc)}
                            />
                        </Grid>
                        <Grid item sm={6} xs={6}>
                            <TextField 
                                autoFocus
                                name="body_muscle_perc"
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="Body Muscle Percent"
                                endAdornment={<InputAdornment position="end">%</InputAdornment>}

                                value={body_muscle_perc}
                                onChange={change.bind(null, "body_muscle_perc")}

                                helperText={touched.body_muscle_perc ? errors.body_muscle_perc : ""}
                                error={touched.body_muscle_perc && Boolean(errors.body_muscle_perc)}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!isValid} color="primary">
                Submit
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}
