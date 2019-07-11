import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import LoginForm from '../components/LoginForm'
import CreateAcctForm from '../components/CreateAcctForm'

import logo from "../images/CPG-White.png";

function TabContainer({ children, dir }) {
    return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
  };
  
  const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      maxWidth: '700px',
      margin: '0 auto 0 auto'
    },
  });
  
class Login extends Component {
    state = {
      value: 0,
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    handleChangeIndex = index => {
      this.setState({ value: index });
    };
  
    render() {
      const { classes, theme } = this.props;
  
      return (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Sign In" />
              <Tab label="Create Account" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>
                <LoginForm setLogin={this.props.setLogin} />
            </TabContainer>
            <TabContainer dir={theme.direction}>
                <CreateAcctForm handleChangeIndex={this.handleChangeIndex} />
            </TabContainer>
          </SwipeableViews>
        </div>
      );
    }
  }
  
  Login.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles, { withTheme: true })(Login);