import React, { Component } from 'react';
import LineChart from 'react-linechart';
import InputRange from 'react-input-range';
import '../../../node_modules/react-linechart/dist/styles.css';
import '../../../node_modules/react-input-range/lib/css/index.css'

class EloHistory extends Component {
    constructor(props) {
        super(props)
        let startPoint = this.props.eloHistory.length > 15 ? this.props.eloHistory.length - 15 : 0;
        let endPoint = this.props.eloHistory.length;
        this.state = {
            value: {min:startPoint, max:endPoint}
        }
    }
    handleHover(point) {
        return (
            "Elo Rating: " + point.y + " Match: " + point.x
        )
    }

  render() {
    let newValues = {min: 0, max: this.props.eloHistory.length}
    if(this.state.value.min >= 0) {
        newValues.min = this.state.value.min
    }
    if(this.state.value.max <= this.props.eloHistory.length) {
        newValues.max = this.state.value.max
    }
    let points = []
    let bottom = this.props.eloHistory[this.props.eloHistory.length - 1]
    let peak = this.props.peakElo + 50
    for(var i = newValues.min; i < newValues.max; i++) {
        if(bottom > this.props.eloHistory[i])
            bottom = this.props.eloHistory[i]
        points.push({x: i, y: this.props.eloHistory[i].toFixed(0)})
    }
    if(newValues.max === this.props.eloHistory.length)
        points.push({x: this.props.eloHistory.length, y: this.props.elo.toFixed(0)})
    else if(newValues.max < this.props.eloHistory.length)
        points.push({x: newValues.max, y: this.props.eloHistory[newValues.max].toFixed(0)})
    const data = [
        {									
            color: "orange", 
            points: points
        }
    ]

    return (
        <div>
            <div className="App">
                <p>Elo History</p>
                <LineChart 
                    width={450 + Math.min(10*(newValues.max - newValues.min), 450)}
                    height={300}
                    xLabel={"Match"}
                    yLabel={""}
                    yMin={bottom.toFixed(0) - 50}
                    yMax={peak.toFixed(0)}
                    onPointHover={this.handleHover}
                    data={data}
                />
                <div className="range-holder">
                    <br/>
                    <InputRange
                        maxValue={this.props.eloHistory.length}
                        minValue={0}
                        value={newValues}
                        onChange={value => this.setState({ value })}
                    />
                </div>
            </div>				
        </div>
    );
  }
}

export default EloHistory;