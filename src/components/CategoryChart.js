import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, MarkSeries, Hint} from 'react-vis';

class CategoryChart extends Component{
  state = {
      newData: "a",
      hintData: false
  }

  componentDidMount() {
      fetch('http://localhost:3000/api/v1/pr_categories/1')
      .then(resp => resp.json())
      .then(data => {
          this.setState({newData: data})
      })
  }

  render() {
    const myData = [
        {x: 2, y: 5, size: 1},
        {x: 1, y: 10, size: 30},
        {x: 1.7, y: 12, size: 10},
        {x: 3, y: 15, size: 12},
        {x: 2.5, y: 7, size: 4}
    ]

    let chartData = () => {
        let array = null
        if (this.state.newData !== "a" ) {
            const record_type = {
                weight: "recordWeight",
                reps: "recordReps"
            }
            array = this.state.newData.category_chart_data.map(obj => {
                let newObj = Object.assign({}, obj)
                newObj.y = newObj[record_type[`${obj.recordType}`]]
                newObj.x = newObj.userBodyWeight
                return newObj
            })
        }
        // debugger;
        return array
    }

    const chartSize = window.innerWidth * 0.75

    return (
      <div>
        <XYPlot height={chartSize} width={chartSize}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <MarkSeries 
                animation={true}
                opacityType={'literal'}
                colorType='literal'
                strokeType='literal'
                data={chartData() !== null ? chartData() : [{x:0,y:0}] }
                className="mark-series-example"
                strokeWidth={2}
                opacity="0.7"
                sizeRange={[5, 30]}
                onNearestXY={value => this.setState({hintData: value})}
            />
            {this.state.hintData ? <Hint value={this.state.hintData} /> : null}
            {/* <Hint value={dataPoint} /> */}
        </XYPlot>
      </div>
    )
  }
}

export default CategoryChart;