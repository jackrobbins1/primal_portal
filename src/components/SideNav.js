import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { NavLink } from "react-router-dom"

// Icons
import HomeIcon from '@material-ui/icons/Home';
import InsertChart from '@material-ui/icons/InsertChart';
import Person from '@material-ui/icons/Person';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import People from '@material-ui/icons/People';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SideNav(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
        <div className={classes.toolbar} />
        <Divider />
        <List>
            <ListItem button>
                <NavLink to="/"></NavLink>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary={'Home'}/>
            </ListItem>
            <ListItem button>
                <ListItemIcon><InsertChart /></ListItemIcon>
                <ListItemText primary={'Personal Records'}/>
            </ListItem>
            <ListItem button>
                <ListItemIcon><Person /></ListItemIcon>
                <ListItemText primary={'Account Settings'}/>
            </ListItem>
            <ListItem button>
                <ListItemIcon ><AssignmentTurnedIn /></ListItemIcon>
                <ListItemText primary={'Record Weight'}/>
            </ListItem>
            <ListItem button>
                <ListItemIcon><People /></ListItemIcon>
                <ListItemText primary={'My Brackets'}/>
            </ListItem>
        </List>
    </div>
  );

//   const fullList = side => (
//     <div
//       className={classes.fullList}
//       role="presentation"
//       onClick={toggleDrawer(side, false)}
//       onKeyDown={toggleDrawer(side, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}>Open Left</Button>
      {/* <Button onClick={toggleDrawer('right', true)}>Open Right</Button>
      <Button onClick={toggleDrawer('top', true)}>Open Top</Button>
      <Button onClick={toggleDrawer('bottom', true)}>Open Bottom</Button> */}
      {/* <Drawer open={state.left} onClose={toggleDrawer('left', false)}> */}
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      {/* <Drawer anchor="top" open={state.top} onClose={toggleDrawer('top', false)}>
        {fullList('top')}
      </Drawer>
      <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
        {fullList('bottom')}
      </Drawer>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer> */}
    </div>
  );
}