import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PRCategoryList from '../components/PRCategoryList'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
    },
});

class AccountPage extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
      userData: props.userData
    }
  }

  render() {

    const { classes } = this.props;

    return (
      <div className="centerContainer">

        <h5>My Account</h5>

        <List className={classes.root}>
            <ListItem>
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel
                        ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="component-outlined"
                    >
                        Username
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={this.state.name}
                        onChange={this.handleChange}
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                </FormControl>
            </ListItem>
            <ListItem>
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel
                        ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="component-outlined"
                    >
                        First Name
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={this.state.name}
                        onChange={this.handleChange}
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
                        Last Name
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={this.state.name}
                        onChange={this.handleChange}
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                </FormControl>
            </ListItem>
        </List>

        {/* <Divider variant="middle" /> */}

        



      </div>
    )
  }
}

AccountPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountPage);