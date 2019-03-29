import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserList from './User/UserList.js';
import User from './User/User.js';
import TournamentList from './Tournament/TournamentList.js';
import Tournament from './Tournament/Tournament.js';
import CountryList from './Country/CountryList.js';
import NotFound from './NotFound.js';
import About from './About/About.js';
import Home from './Home/Home.js';

class Router extends Component {

  render() {
    return (
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/tournaments" render={(props) => <TournamentList {...props} page={1} /> } />
          <Route path="/tournaments/page/:page" component={TournamentList} />
          <Route path="/tournaments/id/:id" component={Tournament} />
          <Route path="/tournaments/:name" component={Tournament} />
          <Route exact path="/users" render={(props) => <UserList {...props} page={'1'} country={null} /> } />
          <Route exact path="/users/country" component={CountryList} />
          <Route exact path="/users/country/page/:page" component={CountryList}/>
          <Route exact path="/users/country/:country" render={(props) => <UserList {...props} page={1} /> } />
          <Route path="/users/country/:country/:page" component={UserList} />
          <Route path="/users/page/:page" component={UserList} />
          <Route path="/users/id/:id" component={User} />
          <Route path="/users/:name" component={User} />
          <Route path="/about" component={About} />
          <Route component={NotFound} status={404} />
        </Switch>
    );
  }
}

export default Router;
