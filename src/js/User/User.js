import React, { Component } from 'react';
import axios from 'axios';
import '../../resources/css/User.css';
import UserData from './UserData.js';
import EloHistory from './EloHistory.js';
import TournamentData from '../Tournament/TournamentData.js';
import MatchData from '../Match/MatchData.js';
import NotFound from '../NotFound.js';
import url from '../../resources/config.json';


class User extends Component {
  constructor(props) {
    super(props)
    this.handleMouseIn = this.handleMouseIn.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    var id = this.props.match.params.id
    var name = this.props.match.params.name
    this.state = {
      pageData: undefined,
      userId: id,
      userName: name,
      hover: false
    }
  }

  handleMouseIn() {
    this.setState({hover: true})
  }
  
  handleMouseOut() {
    this.setState({hover: false})
  }

  componentDidMount () {
    var endpoint = url.api + 'users/'
    if(this.state.userId === undefined)
      endpoint += this.state.userName
    else
      endpoint += 'id/' + this.state.userId
    axios.get(endpoint).then((response) => {
      if(response.data.length === 0)
        this.setState({pageData: null})
      else
        this.setState({pageData: response.data})
    }).catch((error) => {
      console.log(error)
      this.setState({pageData: null})
    })
  }

  componentWillReceiveProps(newProps) {
    if(this.state.pageData !== undefined &&
      (newProps.location.id !== undefined || newProps.location.name !== undefined)) {
      if(newProps.location.id !== undefined && this.state.userId !== newProps.location.id) {
        let endpoint = url.api + 'users/'
        endpoint += 'id/' + newProps.location.id
        axios.get(endpoint).then((response) => {
          if(response.data.length === 0)
            this.setState({pageData: null, userId: newProps.location.id})
          else
            this.setState({pageData: response.data, userId: newProps.location.id})
        }).catch((error) => {
          console.log(error)
          this.setState({pageData: null, userId: newProps.location.id})
        })
      }
      else if(newProps.location.name !== undefined && this.state.userName !== newProps.location.name) {
        let endpoint = url.api + 'users/'
        endpoint += newProps.location.name
        axios.get(endpoint).then((response) => {
          if(response.data.length === 0)
            this.setState({pageData: null, userName: newProps.location.Name})
          else
            this.setState({pageData: response.data, userName: newProps.location.name})
        }).catch((error) => {
          console.log(error)
          this.setState({pageData: null, userName: newProps.location.name})
        })
      }
    }
    else if(this.state.pageData !== undefined && newProps.location.pathname !== undefined &&
      newProps.location.pathname !== ('/users/id/' + this.state.userId)) {
      let id = parseInt(newProps.location.pathname.substring(10))
      let endpoint = url.api + newProps.location.pathname
      axios.get(endpoint).then((response) => {
        if(response.data.length === 0)
          this.setState({pageData: null, userName: undefined, userId: id})
        else 
          this.setState({pageData: response.data, userName: undefined, userId: id})
      }).catch((error) => {
        console.log(error)
        this.setState({pageData: null, userName: undefined, userId: id})
      })
    }
    else if(this.state.pageData !== undefined && newProps.location.pathname !== ('/users/' + this.state.userName)) {
      let name = newProps.location.pathname.substring(7)
      if(name.charAt(name.length) === '/')
        name = name.substring(0, name.length - 1)
      let endpoint = url.api + newProps.location.pathname
      axios.get(endpoint).then((response) => {
        if(response.data.length === 0)
          this.setState({pageData: null, userName: name, userId: undefined})
        else 
          this.setState({pageData: response.data, userName: name, userId: undefined})
      }).catch((error) => {
        console.log(error)
        this.setState({pageData: null, userName: name, userId: undefined})
      })
    }
  }

  render() {

    const hoverStyle = {
      display: this.state.hover ? 'block' : 'none'
    }

    if(this.state.pageData === undefined)
      return (
        <p>Loading</p>
      )
    if(this.state.pageData === null)
        return (
          <NotFound/>
        )
    
    const pastNames = this.state.pageData.pastNames.map(name => {
      return (
        <h6>Also known as {name}</h6>
      )
    })

    const oldId = this.state.pageData.oldId !== 0 ? <>UserId before restriction: {this.state.pageData.oldId}</> : <></>

    const userDataComponent = <UserData
      {...this.state.pageData.user} detailed={true}
      peak={this.state.pageData.peakElo}
      oldId={this.state.pageData.oldId}
    />;
    const userTournamentDataComponents = this.state.pageData.tournaments.map(userDataObject => {
      return (
        <TournamentData {...userDataObject} />
      );
    })

    const userMatchDataComponents = this.state.pageData.matches.map(userDataObject => {
      return (
        <MatchData {...userDataObject} from={'user'}/>
      );
    })

    return (
      <div className="User">
        <div>
          <h2 onMouseOver={this.handleMouseIn} onMouseOut={this.handleMouseOut}>
            Userpage for {this.state.pageData.user.userName}
          </h2>
          <div style={hoverStyle}>
            {pastNames}
            {oldId}
          </div>
          <h2>Elo History</h2>
          <EloHistory eloHistory={this.state.pageData.eloHistory}/>
          <table>
            <thead>
              <tr>
                <th>UserId</th>
                <th>UserName</th>
                <th>Country</th>
                <th>Rank</th>
                <th>Elo</th>
                <th>Peak Elo</th>
                <th>Matches Played</th>
                <th>Matches Won</th>
                <th>Matches Lost</th>
                <th>Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {userDataComponent}
            </tbody>
          </table>
          <h2>Tournaments Played</h2>
          <table>
            <thead>
              <tr>
                <th>Tournament Name</th>
                <th>Tournament Start Date</th>
              </tr>
            </thead>
            <tbody>
              {userTournamentDataComponents}
            </tbody>
          </table>
          <h2>Matches Played</h2>
          <table>
            <thead>
              <tr>
                <th>Tournament</th>
                <th>Elo of Player 1</th>
                <th>Player 1 Username</th>
                <th>Elo of Player 2</th>
                <th>Player 2 Username</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {userMatchDataComponents}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default User;
