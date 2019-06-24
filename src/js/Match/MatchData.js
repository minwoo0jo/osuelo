import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MatchData extends Component {
  render() {
    var placementMsg1 = this.props.player1Placements < 10 ? <><br/>(Unplaced)</> : <></>
    var placementMsg2 = this.props.player2Placements < 10 ? <><br/>(Unplaced)</> : <></>
    if(this.props.from === 'user') {
      const win = parseInt(this.props.userId) === this.props.player1Id
      const placementMatch = this.props.open || ((win && this.props.player2Placements > 9) || (!win && this.props.player1Placements > 9))
      var info1, info2
      if(win) {
        if(placementMatch)
          placementMsg1 = this.props.player1Placements < 10 ? <><br/>({this.props.player1Placements + 1}/10)</> : <></>
        else {
          placementMsg1 = <></>
          placementMsg2 = <></>
        }
        info1 = 
          <>
            <td>{this.props.elo1.toFixed(1)}{placementMsg1}</td>
            <td><Link to={{pathname: `/users/id/${this.props.player1Id}`, id: this.props.player1Id}} >{this.props.player1.startsWith("@RU") ? "Restricted User" : this.props.player1}</Link></td>
          </>
        info2 =
          <>
            <td>{this.props.elo2.toFixed(1)}{placementMsg2}</td>
            <td><Link to={{pathname: `/users/id/${this.props.player2Id}`, id: this.props.player2Id}} >{this.props.player2.startsWith("@RU") ? "Restricted User" : this.props.player2}</Link></td>
          </>
      }
      else{
        if(placementMatch)
          placementMsg2 = this.props.player2Placements < 10 ? <><br/>({this.props.player2Placements + 1}/10)</> : <></>
        else {
          placementMsg1 = <></>
          placementMsg2 = <></>
        }
        info1 =
          <>
            <td>{this.props.elo2.toFixed(1)}{placementMsg2}</td>
            <td><Link to={{pathname: `/users/id/${this.props.player2Id}`, id: this.props.player2Id}} >{this.props.player2.startsWith("@RU") ? "Restricted User" : this.props.player2}</Link></td>
          </>
        info2 = 
          <>
            <td>{this.props.elo1.toFixed(1)}{placementMsg1}</td>
            <td><Link to={{pathname: `/users/id/${this.props.player1Id}`, id: this.props.player1Id}} >{this.props.player1.startsWith("@RU") ? "Restricted User" : this.props.player1}</Link></td>
          </>
      }
      return (
        <tr style={{color:(placementMatch?'black':'gray')}}>
          <td>{this.props.tournament.tournamentName}</td>
          {info1}{info2}
          <td>{this.props.winner.startsWith("@RU") ? "Restricted User" : this.props.winner}</td>
          <td><div style={{color:(win?'green':'red')}}>{(win ? '+' + this.props.eloChange1.toFixed(1) : this.props.eloChange2.toFixed(1))}</div></td>
        </tr>
      )
    }
    return (
      <tr>
        <td>{this.props.elo1.toFixed(1)}{placementMsg1}</td>
        <td><Link to={{pathname: `/users/id/${this.props.player1Id}`, id: this.props.player1Id}} >{this.props.player1.startsWith("@RU") ? "Restricted User" : this.props.player1}</Link></td>
        <td>{this.props.elo2.toFixed(1)}{placementMsg1}</td>
        <td><Link to={{pathname: `/users/id/${this.props.player2Id}`, id: this.props.player2Id}} >{this.props.player2.startsWith("@RU") ? "Restricted User" : this.props.player2}</Link></td>
        <td>{this.props.winner.startsWith("@RU") ? "Restricted User" : this.props.winner}</td>
      </tr>
    );
  }
}

export default MatchData;