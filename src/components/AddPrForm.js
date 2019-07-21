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
            pr_category_id,
            weight,
            reps,
            minutes,
            seconds,
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
        setStatus,
        setErrors,
        setTouched
    } = props;

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleFormDate = newDate => {
        const formattedDate = moment(newDate).format("YYYY-MM-DD")
    
        setFieldValue('selectedDate', newDate, false)
        setFieldValue('date', formattedDate, false)
    }

    const testChange = e => {
        console.log(e)
        console.log("value is:", e.target.value)
    }

    const dynamicForm = categoryType => {
        let categoryId = pr_category_id

        const result = props.categoryList[categoryId].weight_reps_or_time_based.includes(categoryType)
        return result
    }



    // const disableSubmit = () => {
    //     if (dynamicForm('weight') && weight === '') {
    //         return true
    //     } else if (dynamicForm('reps') && reps === '') {
    //         return true
    //     } else if (dynamicForm('time') && minutes === '' && seconds === '') {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    // const disableSubmit = () => {
    //     if (dynamicForm('weight') && weight === '') {
    //         console.log('weight was hit')
    //         setFieldError('weight', 'Weight is required')
    //     } else if (dynamicForm('reps') && reps === '') {
    //         setFieldError('reps', 'Reps is required')
    //     } else if (dynamicForm('time') && minutes === '' && seconds === '') {
    //         setFieldError('minutes', 'Time is required')
    //         setFieldError('seconds', 'Time is required')
    //     }
    //     console.log(errors)
    // }
    const clearValues = () => {
        setFieldValue('weight', '', false)
        setFieldValue('reps', '', false)
        setFieldValue('minutes', '', false)
        setFieldValue('seconds', '', false)
        setFieldValue('selectedDate', moment(), false)
    }

    const disableSubmit = () => {
            if (dynamicForm('weight') && weight === '') {
                // errors.weight = "Required"
                setStatus({weight: "Required"})
                handleDisableButton(true)
            } else if (dynamicForm('reps') && reps === '') {
                // errors.reps = "Required"
                setStatus({reps: "Required"})
                handleDisableButton(true)
            } else if (dynamicForm('time') && minutes === '' && seconds === '') {
                setStatus({time: "Required"})
                // errors.minutes = "Required"
                // errors.seconds = "Required"
                handleDisableButton(true)
            } else if (dynamicForm('time') && minutes === 0 && seconds === 0) {
                setStatus({time: "Time can't be 0"})
                handleDisableButton(true)
            } else {
                handleDisableButton(false)
                setStatus({
                    weight: null,
                    reps: null,
                    time: null
                })
            }
    }

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const handleSelect = e => {
        setStatus({
            weight: null,
            reps: null,
            time: null
        })
        setErrors({
            weight: '',
            reps: '',
            minues: '',
            seconds: ''
        })
        setTouched({
            weight: false,
            reps: false,
            minues: false,
            seconds: false
        })
        clearValues()
        handleDisableButton(true)
        setFieldValue('pr_category_id', e.target.value, false)
    }

    useEffect(() => {
        disableSubmit()
    }, [weight, reps, minutes, seconds])

    return (
        <React.Fragment>
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item sm={12} xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                PR Category
                            </InputLabel>
                            <Select
                                value={pr_category_id}
                                onChange={handleSelect}
                                input={<OutlinedInput labelWidth={labelWidth} name="pr_category_id" />}
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
                    </Grid>
                    {dynamicForm("weight") ?
                        <Grid item sm={12} xs={12}>
                            <TextField 
                                autoFocus
                                name="weight"
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="Weight"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}

                                value={weight}
                                onChange={change.bind(null, "weight")}

                                helperText={touched.weight ? errors.weight || status.weight : ""}
                                error={touched.weight && (Boolean(errors.weight) || Boolean(status.weight))}
                            />
                        </Grid>
                        :
                        null
                    }
                    {dynamicForm("reps") ?
                        <Grid item sm={12} xs={12}>
                            <TextField 
                                // {dynamicForm("weight") ? null : autoFocus}
                                name="reps"
                                variant="outlined"
                                type="number"
                                fullWidth
                                label="Reps"

                                value={reps}
                                onChange={change.bind(null, "reps")}

                                helperText={touched.reps ? errors.reps || status.reps : ""}
                                error={touched.reps && (Boolean(errors.reps) || Boolean(status.reps))}
                            />
                        </Grid>
                        :
                        null
                    }
                    {dynamicForm("time") ?
                        <React.Fragment>
                            <Grid item sm={6} xs={6}>
                                <TextField 
                                    name="minutes"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    label="Time: minutes"

                                    value={minutes}
                                    onChange={change.bind(null, "minutes")}

                                    helperText={touched.minutes ? errors.minutes || status.time : ""}
                                    error={touched.minutes && (Boolean(errors.minutes) || Boolean(status.time))}
                                />
                            </Grid>
                            <Grid item sm={6} xs={6}>
                                <TextField 
                                    name="seconds"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    label="Time: seconds"

                                    value={seconds}
                                    onChange={change.bind(null, "seconds")}

                                    helperText={touched.seconds ? errors.seconds || status.time : ""}
                                    error={touched.seconds && (Boolean(errors.seconds) || Boolean(status.time))}
                                />
                            </Grid>
                        </React.Fragment>
                        :
                        null
                    }
                    <Grid>
                        <div className="modalDatePicker">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <DatePicker
                                    disableFuture
                                    format="MM-dd-yyyy"
                                    margin="normal"
                                    label="Record Date"
                                    value={selectedDate}
                                    onChange={handleFormDate}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={disableButton || !isValid} color="primary">
                Submit
            </Button>
        </DialogActions>
        </React.Fragment>
    )
}
