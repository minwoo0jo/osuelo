import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserList from './User/UserList.js';
import User from './User/User.js';
import TournamentList from './Tournament/TournamentList.js';
import Tournament from './Tournament/Tournament.js';
import CountryList from './Country/CountryList.js';
import NotFound from './NotFound.js';
import About from './About/About.js';
import Home2 from './Home/Home2.js';
import Search from './Search/Search.js';
import Submit from './Submit/Submit.js';
import Contributors from './Contributors/Contributors.js';
import CompleteUserList from './User/CompleteUserList.js';
//import UserListHistory from './User/UserListHistory.js';
//import EloCalculator from './About/EloCalculator.js';

class Router extends Component {

  render() {
    return (
        <Switch>
          <Route exact path="/" component={Home2}/>
          {/*<Route exact path="/calculator" component={EloCalculator} />*/}
          <Route exact path="/tournaments" render={(props) => <TournamentList {...props} page={1} /> } />
          <Route path="/tournaments/page/:page" component={TournamentList} />
          <Route path="/tournaments/id/:id" component={Tournament} />
          <Route path="/tournaments/:name" component={Tournament} />
          <Route exact path="/users" render={(props) => <UserList {...props} page={'1'} country={null} /> } />
          <Route exact path="/users/complete" render={(props) => <CompleteUserList {...props} page={'1'} country={null} /> } />
          <Route exact path="/users/complete/page/:page" component={CompleteUserList} />
          {/*<Route exact path="/users/past" render={(props) => <UserListHistory {...props} page={'1'} country={null} /> } />
          <Route exact path="/users/past/page/:page" component={UserListHistory} />*/}
          <Route exact path="/users/country" render={(props) => <CountryList {...props} page={1} /> } />
          <Route exact path="/users/country/page/:page" component={CountryList}/>
          <Route exact path="/users/country/:country" render={(props) => <UserList {...props} page={1} /> } />
          <Route path="/users/country/:country/:page" component={UserList} />
          <Route path="/users/page/:page" component={UserList} />
          <Route path="/users/id/:id" component={User} />
          <Route path="/users/:name" component={User} />
          <Route path="/about" component={About} />
          <Route path="/search" component={Search} />
          <Route path="/submit" component={Submit} />
          <Route path="/contributors" component={Contributors} />
          <Route component={NotFound} status={404} />
        </Switch>
    );
  }
}

export default Router;
