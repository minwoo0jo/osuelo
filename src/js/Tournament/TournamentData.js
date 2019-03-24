import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TournamentData extends Component {
  render() {
    return (
      <tr>
        <td><Link to={`/tournaments/id/${this.props.tournamentId}`} >{this.props.tournamentName}</Link></td>
        <td>{this.props.startDate}</td>
      </tr>
    );
  }
}

export default TournamentData;