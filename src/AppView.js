import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom"; 

// Components
import Navbarr from './components/Navbarr'
import SideNavv from './components/SideNavv'

// Icons
import HomeIcon from '@material-ui/icons/Home';
import InsertChart from '@material-ui/icons/InsertChart';
import Person from '@material-ui/icons/Person';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import People from '@material-ui/icons/People';
import MenuIcon from '@material-ui/icons/Menu';


import ResponsiveDrawer from './components/Navbar'
import HomePage from './pages/HomePage'

class AppView extends Component{
    state = {
        sideNavOpen: false,
        user_id: this.props.user_id,
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/users/${this.state.user_id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({userData: data})
        })
    }

    sideNavHandler = () => {
        this.setState({
            sideNavOpen: !this.state.sideNavOpen
        })
    }

    render() {
        return(
            <div>
                <SideNavv openSideNav={this.state.sideNavOpen} sideNavHandler={this.sideNavHandler} />
                <Navbarr sideNavHandler={this.sideNavHandler} />
                {this.state.userData ? <HomePage userData={this.state.userData} /> : null}
            </div>
            // <div>
            //     <HomePage userData={this.state.userData} />
            // </div>
        )
        
    }

    // End of class
}

export default AppView

// const drawer = (
//     <div>
//         <div className={classes.toolbar} />
//         <Divider />
//         <List>
//             <ListItem button>
//             <NavLink to="/"></NavLink>
//             <ListItemIcon><HomeIcon /></ListItemIcon>
//             <ListItemText primary={'Home'}/>
//             </ListItem>
//             <ListItem button>
//             <ListItemIcon><InsertChart /></ListItemIcon>
//             <ListItemText primary={'Personal Records'}/>
//             </ListItem>
//             <ListItem button>
//             <ListItemIcon><Person /></ListItemIcon>
//             <ListItemText primary={'Account Settings'}/>
//             </ListItem>
//             <ListItem button>
//             <ListItemIcon ><AssignmentTurnedIn /></ListItemIcon>
//             <ListItemText primary={'Record Weight'}/>
//             </ListItem>
//             <ListItem button>
//             <ListItemIcon><People /></ListItemIcon>
//             <ListItemText primary={'My Brackets'}/>
//             </ListItem>
//         </List>
//     </div>
// );