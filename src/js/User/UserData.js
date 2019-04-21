import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserData extends Component {
  render() {
    const name = this.props.userName.startsWith('@RU') ? 'Restricted User' : this.props.userName
    const id = this.props.oldId === 0 ? this.props.userId : this.props.oldId
    const rank = this.props.placed === true ? this.props.rank : 'Unplaced'
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
    if(this.props.detailed === false)
      
      return (
        <tr>
          <td>{this.props.countryList ? this.props.countryRank : rank}</td>
          <td>
            <Link to={{pathname: `/users/country/${this.props.country}/1`, page: 1, country: this.props.country}}>
              <img src={imgPath} alt={this.props.country}/>
            </Link>
            {' '}
            <Link to={`/users/id/${this.props.userId}`}>{name}</Link></td>
          <td>{this.props.sort === 'rank' ? eloBold : this.props.elo.toFixed(1)}</td>
          <td>{this.props.sort === 'win' ? winBold : this.props.winRate.toFixed(2)}</td>
          <td>{this.props.sort === 'matches' ? matchBold : this.props.numMatches}</td>
        </tr>
      )
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
          {rank !== 'Unplaced' ? rankLink : rank}&nbsp;
          {rank !== 'Unplaced' ? '' : (this.props.countryRank > 0 ? `(${this.props.countryRank} ${this.props.country})` : '')}
        </td>
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