import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MatchData extends Component {
  render() {
    let info = this.props.matchSequence
    if(this.props.from === 'user')
      info = this.props.tournament.tournamentName
    return (
      <tr>
        <td>{info}</td>
        <td>{this.props.elo1.toFixed(1)}</td>
        <td><Link to={{pathname: `/users/id/${this.props.player1Id}`, id: this.props.player1Id}} >{this.props.player1.startsWith("@RU") ? "Restricted User" : this.props.player1}</Link></td>
        <td>{this.props.elo2.toFixed(1)}</td>
        <td><Link to={{pathname: `/users/id/${this.props.player2Id}`, id: this.props.player2Id}} >{this.props.player2.startsWith("@RU") ? "Restricted User" : this.props.player2}</Link></td>
        <td>{this.props.winner.startsWith("@RU") ? "Restricted User" : this.props.winner}</td>
      </tr>
    );
  }
}

export default MatchData;