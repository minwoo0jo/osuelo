import React, { Component } from 'react';
import { Link } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import Router from './Router.js';
import Navigation from './Navigation/Navigation.js';
import '../resources/css/App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Navigation/>
        <br/>
        <Router/>
      </div>
    );
  }
}

export default App;
