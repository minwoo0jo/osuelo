import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserMatchData extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.matchSequence}</td>
        <td>{this.props.elo1.toFixed(1)}</td>
        <td><Link to={{pathname: `/users/id/${this.props.player1Id}`, id: this.props.player1Id}} >{this.props.player1}</Link></td>
        <td>{this.props.elo2.toFixed(1)}</td>
        <td><Link to={{pathname: `/users/id/${this.props.player2Id}`, id: this.props.player2Id}} >{this.props.player2}</Link></td>
        <td>{this.props.winner}</td>
      </tr>
    );
  }
}

export default UserMatchData;