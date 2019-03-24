import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserData extends Component {
  render() {
    if(this.props.detailed === false)
      return (
        <tr>
          <td>{this.props.userId}</td>
          <td><Link to={`/users/id/${this.props.userId}`}>{this.props.userName}</Link></td>
          <td><Link to={{pathname: `/users/country/${this.props.country}/1`, page: 1}}>{this.props.country}</Link></td>
          <td>{this.props.rank}</td>
          <td>{this.props.elo.toFixed(1)}</td>
        </tr>
      )
    return (
      <tr>
        <td>{this.props.userId}</td>
        <td><Link to={`/users/id/${this.props.userId}`}>{this.props.userName}</Link></td>
        <td><Link to={{pathname: `/users/country/${this.props.country}/1`, page: 1}}>{this.props.country}</Link></td>
        <td>{this.props.rank}</td>
        <td>{this.props.elo.toFixed(1)}</td>
        <td>{this.props.peak.toFixed(1)}</td>
        <td>{this.props.numMatches}</td>
        <td>{this.props.numWins}</td>
        <td>{this.props.numLosses}</td>
        <td>{this.props.winRate.toFixed(2)}</td>
      </tr>
    );
  }
}

export default UserData;