import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import WeightChart from '../components/WeightChart'


class MyWeightsPage extends PureComponent{
//   constructor(props) {
//     super(props)
//     this.state = {
//       userData: props.userData
//     }
//   }

    state = {

    }

    render() {

        return (
            <div className='centerContainer'>
                <h5>My Weight Records</h5>

                <WeightChart userData={this.props.userData} fetchNewData={this.props.fetchNewData}/>

            </div>
        )
    }
}

export default MyWeightsPage;