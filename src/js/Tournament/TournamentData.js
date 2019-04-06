import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TournamentData extends Component {
  render() {
    if(this.props.detailed === true) {
      var imgChallonge = undefined
      try {
          imgChallonge = require('../../resources/images/challonge.ico')
      } catch {
          imgChallonge = ''
      }
      var imgOsu = undefined
      try {
          imgOsu = require('../../resources/images/osu.ico')
      } catch {
          imgOsu = ''
      }
      const challonge = (this.props.challonge !== undefined && this.props.challonge.length > 0)
        ? <a href={this.props.challonge}><img width="25" height="25" src={imgChallonge} alt="Challonge" /></a> : <></>
      const forum = (this.props.forum !== undefined && this.props.forum.length > 0)
        ? <a href={this.props.forum}><img width="25" height="25" src={imgOsu} alt="Forum Post"/></a> : <></>
      return (
        <tr>
          <td><Link to={`/tournaments/id/${this.props.tournamentId}`} >{this.props.tournamentName}</Link></td>
          <td>{this.props.startDate}</td>
          <td>{this.props.shortName}</td>
          <td>{challonge}&nbsp;&nbsp;{forum}</td>
        </tr>
      )
    }
    return (
      <tr>
        <td><Link to={`/tournaments/id/${this.props.tournamentId}`} >{this.props.tournamentName}</Link></td>
        <td>{this.props.startDate}</td>
      </tr>
    );
  }
}

export default TournamentData;