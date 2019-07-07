import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { NavLink, Link } from "react-router-dom"

// Icons
import HomeIcon from '@material-ui/icons/Home';
import InsertChart from '@material-ui/icons/InsertChart';
import Person from '@material-ui/icons/Person';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import People from '@material-ui/icons/People';

// const styles = {
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// };

class SideNavv extends Component {
  state = {
    left: this.props.openSideNav
  };

  toggleDrawer = (open) => () => {
    this.props.sideNavHandler()
    this.setState({
      left: open,
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ left: nextProps.openSideNav });  
  }

  render() {

    const sideList = (
      <div className='myList'>
        <Divider />
        <List>
            <ListItem button key="Home" component={Link} to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={'Home'}/>
            </ListItem>
            <ListItem button key="My Personal Records" component={Link} to="/my_personal_records">
              <ListItemIcon><InsertChart /></ListItemIcon>
              <ListItemText primary={'Personal Records'} />           
            </ListItem>
            <ListItem button>
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary={'Account Settings'}/>
            </ListItem>
            <ListItem button key="My Weight Records" component={Link} to="/my_weight_records">
              <ListItemIcon ><AssignmentTurnedIn /></ListItemIcon>
              <ListItemText primary={'Record Weight'}/>
            </ListItem>
            {/* <ListItem button>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary={'My Brackets'}/>
            </ListItem> */}
        </List>
      </div>
    );


    return (
      <div>
        {/* <Button onClick={this.toggleDrawer(true)}>Open Left</Button> */}
        <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

// SideNavv.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default SideNavv;