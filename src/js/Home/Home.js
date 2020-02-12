import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../resources/css/App.css';
import '../../resources/css/Home.css';

class Home extends Component {
    render() {
      return (
          <div className="App">
            <div className="Wrapper">
              <div className="Main">
                <h2>Welcome to the 1v1 osu! Elo System database!</h2>
                <div className="MainBody">
                  <hr/>
                </div>
              </div>
              <div className="SideBar">
                <Link role='button' class='btn btn-secondary btn-lg btn-block' to={`/users`}>Global Player Rankings</Link>
                <br/>
                <Link role='button' class='btn btn-secondary btn-lg btn-block' to={`/tournaments`}>Full Tournament Listing</Link>
                <br/>
                <Link role='button' class='btn btn-secondary btn-lg btn-block' to={`/about`}>About Page</Link>
              </div>
            </div>
          </div>
      );
    }
}

export default Home