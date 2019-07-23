import React, { useState } from 'react';
import Navbarr from './Navbarr'
import SideNavv from './SideNavv'


export default function NavigationContainer(props) {
    const [sideNavOpen, sideNavHandler] = useState(false);

    return (
        <React.Fragment>
            <Navbarr sideNavHandler={sideNavHandler} handleLogout={props.handleLogout} sideNavOpen={sideNavOpen} />
            <SideNavv openSideNav={sideNavOpen} sideNavHandler={sideNavHandler} sideNavOpen={sideNavOpen} />
        </React.Fragment>
    );
}