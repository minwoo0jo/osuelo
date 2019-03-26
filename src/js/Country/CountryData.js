import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CountryData extends Component {
  render() {
    return (
      <tr>
        <td><Link to={`/users/country/${this.props.abbr}/1`}>{this.props.fullName}</Link></td>
        <td>{this.props.numUsers}</td>
      </tr>
    );
  }
}

export default CountryData;