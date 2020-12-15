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
    this.handleRange = this.handleRange.bind(this)
    var id = this.props.match.params.id
    var name = this.props.match.params.name
    this.state = {
      pageData: undefined,
      userId: id,
      userName: name,
      hover: false,
      range: [10, 50]
    }
  }

  handleMouseIn() {
    this.setState({hover: true})
  }
  
  handleMouseOut() {
    this.setState({hover: false})
  }

  handleRange(e, value) {

  }

  componentDidMount () {
    document.title = "https://osuelo.com" + this.props.location.pathname
    var endpoint = url.api + 'users/'
    if(this.state.userId === undefined)
      endpoint += this.state.userName
    else
      endpoint += 'id/' + this.state.userId
    axios.get(endpoint).then((response) => {
      if(response.data.length === 0)
        this.setState({pageData: null})
      else {
        this.setState({pageData: response.data, userId: response.data.user.userId, userName: response.data.user.userName})
        document.title = this.state.pageData.user.userName + "'s Profile"
      }
    }).catch((error) => {
      console.log(error)
      this.setState({pageData: null})
    })
  }

  componentWillReceiveProps(newProps) {
    if(this.state.pageData !== undefined && newProps.location.pathname !== undefined) {
      this.setState({pageData: undefined})
      window.scrollTo(0, 0)
      if(newProps.location.id !== undefined || newProps.location.name !== undefined) {
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
      else if(newProps.location.pathname !== undefined &&
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
      else if(newProps.location.pathname !== ('/users/' + this.state.userName)) {
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
        <h6>{name}</h6>
      )
    })
    const name = this.state.pageData.user.userName.startsWith('@RU') ? 'Restricted User' : this.state.pageData.user.userName

    const oldId = this.state.pageData.oldId !== 0 ? <>User Id: {this.state.pageData.oldId}</> : <></>

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
        <MatchData {...userDataObject} from={'user'} userId={this.state.userId}/>
      );
    })

    return (
      <div className="User">
        <div>
          <div className="Wrapper">
            <div className="UserSideBar">
              <div className="card">
                <div className="img-holder">
                  <img className="card-img-top img-aspect" src={'https://a.ppy.sh/' + this.state.pageData.user.userId + '_1552467424.jpeg'} alt="Profile"/>
                </div>
                <div className="card-body">
                  <h4 onMouseOver ={this.handleMouseIn} onMouseOut={this.handleMouseOut} className="card-text">{name}</h4>
                </div>
              </div>
              <div style={hoverStyle}>
                <h6>{this.state.pageData.pastNames.length > 0 ? 'Also known as:' : ''}</h6>
                {pastNames}
                {oldId}
              </div>
            </div>
            <div className="UserMain">
            <table>
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Username</th>
                  <th>Rank (Country)</th>
                  <th>Elo</th>
                  <th>Peak Elo</th>
                  <th>Matches Played</th>
                  <th>Win Rate</th>
                  <th>Tournaments Won</th>
                </tr>
              </thead>
              <tbody>
                {userDataComponent}
              </tbody>
            </table>
            <br />
            {this.state.pageData.user.numMatches > 0 ?
            <EloHistory
              eloHistory={this.state.pageData.eloHistory}
              peakElo={this.state.pageData.peakElo}
              elo={this.state.pageData.user.elo}
              range={this.state.range}/> : <></>}
          <br /><br />
          <h2 className="card-body">Tournaments Played</h2>
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
          </div>
          </div>
          <h2 className="card-body">Matches Played</h2>
          <p className="card-body">Non-international tournaments are gray and do not count for placements unless facing a ranked player</p>
          <table>
            <thead>
              <tr>
                <th>Tournament</th>
                <th>Player 1 Elo</th>
                <th>Player 1</th>
                <th>Player 2 Elo</th>
                <th>Player 2</th>
                <th>Winner</th>
                <th>Change</th>
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
