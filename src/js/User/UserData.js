import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserData extends Component {
  render() {
    const name = this.props.userName.startsWith('@RU') ? 'Restricted User' : this.props.userName
    const id = this.props.oldId === 0 ? this.props.userId : this.props.oldId
    const rank = this.props.placed === true ? this.props.rank : 'Unplaced (' + this.props.numPlacements + '/10)'
    var style = this.props.userName.startsWith('@RU') ? {backgroundColor:'#ff9696', fontStyle:'normal'} : {fontStyle:'normal'}
    const styleFont = this.props.placed === true ? 'normal' : 'italic'
    style.fontStyle = styleFont
    var imgPath = undefined
    try {
      imgPath = require('../../resources/images/country/' + this.props.country + '.gif')
    } catch (error) {
      console.log(error)
      imgPath = ''
    }
    const eloBold = <b>{this.props.elo.toFixed(1)}</b>
    const winBold = <b>{this.props.winRate.toFixed(2)}</b>
    const matchBold = <b>{this.props.numMatches}</b>
    const tournamentBold = <b>{this.props.numTournamentWins}</b>
    if(this.props.detailed === false) {
      var rankChange = <>{this.props.rankChange >= 0 ? '+' + this.props.rankChange : this.props.rankChange}</>
      const countryRanks = <><td>{rank}</td><td>{this.props.countryRank > 0 ? this.props.countryRank : ''}</td></>
      return (
        <tr style={style}>
          {this.props.rankChange === undefined ? <></> : <td style={{color:(this.props.rankChange > 0 ? 'green' : (this.props.rankChange < 0 ? 'red' : 'gray'))}}>{rankChange}</td>}
          {countryRanks}
          <td>
            <Link to={{pathname: `/users/country/${this.props.country}/1`, page: 1, country: this.props.country}}>
              <img src={imgPath} alt={this.props.country}/>
            </Link>
            {' '}
            <Link to={`/users/id/${this.props.userId}`}>{name}</Link></td>
          <td title={this.props.elo}>{this.props.sort === 'rank' ? eloBold : this.props.elo.toFixed(1)}</td>
          <td title={this.props.winRate}>{this.props.sort === 'win' ? winBold : this.props.winRate.toFixed(2)}</td>
          <td>{this.props.sort === 'matches' ? matchBold : this.props.numMatches}</td>
          <td>{this.props.sort === 'tournamentWin' ? tournamentBold : this.props.numTournamentWins}</td>
        </tr>
      )
    }
    const rankLink = <><Link to={`/users/page/${Math.ceil(this.props.rank * 1.0 / 50)}`}>{this.props.rank}</Link> {this.props.countryRank > 0 ? `(${this.props.countryRank} ${this.props.country})` : ''}</>
    return (
      <tr>
        <td>{this.props.userId}</td>
        <td>
          <Link to={{pathname: `/users/country/${this.props.country}/1`, page: 1, country: this.props.country}}>
            <img src={imgPath} alt={this.props.country}/>
          </Link>{' '}
          <a href={'https://osu.ppy.sh/u/' + id} target="_blank" rel="noreferrer noopener">{name}</a></td>
        <td>
          {typeof rank !== 'string' ? rankLink : rank}&nbsp;
          {typeof rank !== 'string' ? '' : (this.props.countryRank > 0 ? `(${this.props.countryRank} ${this.props.country})` : '')}
        </td>
        <td title={this.props.elo}>{this.props.elo.toFixed(1)}</td>
        <td title={this.props.peak}>{this.props.peak.toFixed(1)}</td>
        <td>{this.props.numMatches}</td>
        <td title={this.props.winRate}>{this.props.winRate.toFixed(2)}</td>
        <td>{this.props.numTournamentWins}</td>
      </tr>
    );
  }
}

export default UserData;