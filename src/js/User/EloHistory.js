import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';

class EloHistory extends Component {
  render() {
    let points = []
    let iter = 0
    for(var i = this.props.eloHistory.length > 30 ? this.props.eloHistory.length - 30 : 0;
        i < this.props.eloHistory.length; i++) {
        points.push({x: iter, y: this.props.eloHistory[i].toFixed(1)})
        iter = iter + 1
    }
    const data = [
        {									
            color: "steelblue", 
            points: points
        }
    ]

    return (
        <div>
            <div className="App">
                <h1>My First LineChart</h1>
                <LineChart 
                    width={600}
                    height={400}
                    xLabel={"Match"}
                    yLabel={"Elo"}
                    data={data}
                />
            </div>				
        </div>
    );
  }
}

export default EloHistory;