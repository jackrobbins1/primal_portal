import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DraftsIcon from '@material-ui/icons/Drafts';

class HomePage extends Component{
    state = {

    }

    render() {
        const allCategories = this.props.categories.map(cate => {
            return (
                <ListItem button>
                    <ListItemIcon>
                        <FitnessCenterIcon />
                    </ListItemIcon>
                    <ListItemText primary={cate.name} />
                </ListItem>
            )
        })


        return (
            <div>
                <List>
                    {allCategories}
                </List>
            </div>
        )
       
    }
}

export default HomePage;