import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
      return (
          <div>
            <p><Link to={`/users`}>Player Rankings</Link></p>
            <p><Link to={`/tournaments`}>Tournament Listing</Link></p>
          </div>
      );
    }
}

export default Home