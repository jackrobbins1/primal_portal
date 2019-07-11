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
import MyPRsPage from './pages/MyPRsPage';
import PRChartPage from './pages/PRChartPage'
import PRChartPagee from './pages/PRChartPagee'
import MyWeightsPage from './pages/MyWeightsPage';
import AccountPage from './pages/AccountPage';

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

    fetchNewData = () => {
        fetch(`http://localhost:3000/api/v1/users/${this.state.user_id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({userData: data})
        })
    }

    render() {
        return(
            // <div>
            //     <PRChartPage />
            // </div>

            <Router>
                <Navbarr sideNavHandler={this.sideNavHandler} />
                <SideNavv openSideNav={this.state.sideNavOpen} sideNavHandler={this.sideNavHandler} />
                <div>
                    <Route exact path="/" component={() => this.state.userData ? <HomePage userData={this.state.userData} fetchNewData={this.fetchNewData} /> : null}  />
                    <Route exact path="/my_personal_records" render={() => (<MyPRsPage completedPRs={this.state.userData.record_categories} unrecordedPRs={this.state.userData.unrecorded_categories} />)}  />
                    <Route exact path="/pr_chart_page/:catId" render={(routeProps) => (<PRChartPage {...routeProps} userID={this.state.user_id} userData={this.state.userData} fetchNewData={this.fetchNewData} />)}/>
                    <Route exact path="/my_weight_records" render={() => (<MyWeightsPage userData={this.state.userData} fetchNewData={this.fetchNewData} />)}  />
                    <Route exact path="/my_account" render={() => this.state.userData ? (<AccountPage userData={this.state.userData} fetchNewData={this.fetchNewData} />) : null}  />
                </div>
            </Router>

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