import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CountryData extends Component {
  render() {
    var imgPath = undefined
    try {
        imgPath = require('../../resources/images/country/' + this.props.abbr + '.gif')
    } catch {
        imgPath = ''
    }
    return (
      <tr>
        <td><img src={imgPath} alt={this.props.abbr}/></td>
        <td><Link to={`/users/country/${this.props.abbr}/1`}>{this.props.fullName}</Link></td>
        <td>{this.props.numUsers}</td>
        <td>{this.props.averageElo.toFixed(1)}</td>
      </tr>
    );
  }
}

export default CountryData;