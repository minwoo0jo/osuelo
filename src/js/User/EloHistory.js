import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';

class EloHistory extends Component {
  render() {
    let points = []
    let bottom = this.props.eloHistory[this.props.eloHistory.length - 1]
    let peak = this.props.peakElo + 50
    for(var i = this.props.eloHistory.length > 15 ? this.props.eloHistory.length - 15 : 0;
        i < this.props.eloHistory.length; i++) {
        if(bottom > this.props.eloHistory[i])
            bottom = this.props.eloHistory[i]
        points.push({x: i, y: this.props.eloHistory[i].toFixed(0)})
    }
    points.push({x: this.props.eloHistory.length, y: this.props.elo})
    const data = [
        {									
            color: "steelblue", 
            points: points
        }
    ]

    return (
        <div>
            <div className="App">
                <p>Elo History</p>
                <LineChart 
                    width={600}
                    height={300}
                    xLabel={"Match"}
                    yLabel={"Elo"}
                    yMin={bottom.toFixed(0) - 50}
                    yMax={peak.toFixed(0)}
                    data={data}
                />
            </div>				
        </div>
    );
  }
}

export default EloHistory;