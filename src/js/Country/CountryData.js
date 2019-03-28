import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CountryData extends Component {
  render() {
    return (
      <tr>
        <td><img src={require('../../resources/images/country/' + this.props.abbr + '.gif')} alt={this.props.abbr}/></td>
        <td><Link to={`/users/country/${this.props.abbr}/1`}>{this.props.fullName}</Link></td>
        <td>{this.props.numUsers}</td>
      </tr>
    );
  }
}

export default CountryData;