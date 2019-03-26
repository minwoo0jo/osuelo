import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../resources/css/App.css';

class Home extends Component {
    render() {
      return (
          <div className="App">
            <p><Link to={`/users`}>Player Rankings</Link></p>
            <p><Link to={`/tournaments`}>Tournament Listing</Link></p>
          </div>
      );
    }
}

export default Home