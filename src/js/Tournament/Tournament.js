import React, { Component } from 'react';
import axios from 'axios';
import '../../resources/css/Tournament.css';
import UserData from '../User/UserData.js';
import MatchData from '../Match/MatchData.js';
import TournamentData from './TournamentData.js';
import NotFound from '../NotFound.js';
import url from '../../resources/config.json';

class Tournament extends Component {
  constructor(props) {
    super(props)
    var id = this.props.match.params.id
    var name = this.props.match.params.name
    this.state = {
      pageData: undefined,
      tournamentId: id,
      tournamentName: name
    }    
  }

  componentDidMount () {
    document.title = "https://osuelo.com" + this.props.location.pathname
    var endpoint = url.api + 'tournaments/'
    if(this.state.tournamentId === undefined)
      endpoint += this.state.tournamentName
    else
      endpoint += 'id/' + this.state.tournamentId
    axios.get(endpoint).then((response) => {
      if(response.data.length === 0)
        this.setState({pageData: null})
      else {
        this.setState({pageData: response.data})
        document.title = this.state.pageData.tournament.tournamentName
      }
    }).catch((error) => {
      console.log(error)
      this.setState({pageData: null})
    })
  }
  
  componentWillReceiveProps(newProps) {
    if(this.state.pageData !== undefined && newProps.location.pathname !== undefined &&
        newProps.location.pathname.substring(14, 17) === 'id/' &&
        newProps.location.pathname !== ('/tournaments/id/' + this.state.tournamentId)) {
      let id = parseInt(newProps.location.pathname.substring(17))
      let endpoint = url.api + newProps.location.pathname
      axios.get(endpoint).then((response) => {
        if(response.data.length === 0)
          this.setState({pageData: null, tournamentName: undefined, tournamentId: id})
        else 
          this.setState({pageData: response.data, tournamentName: undefined, tournamentId: id})
      }).catch((error) => {
        console.log(error)
        this.setState({pageData: null, tournamentName: undefined, tournamentId: id})
      })
    }
    else if(this.state.pageData !== undefined && newProps.location.pathname !== undefined &&
      newProps.location.pathname !== ('/tournaments/' + this.state.tournamentName)) {
      let name = newProps.location.pathname.substring(14)
      if(name.charAt(name.length) === '/')
        name = name.substring(0, name.length - 1)
      let endpoint = url.api + newProps.location.pathname
      axios.get(endpoint).then((response) => {
        if(response.data.length === 0)
          this.setState({pageData: null, tournamentName: name, tournamentId: undefined})
        else 
          this.setState({pageData: response.data, tournamentName: name, tournamentId: undefined})
      }).catch((error) => {
        console.log(error)
        this.setState({pageData: null, tournamentName: name, tournamentId: undefined})
      })
    }
  }

  render() {
    if(this.state.pageData === undefined)
      return (
        <p>Loading</p>
      )
    if(this.state.pageData === null)
      return (
        <NotFound />
      )

    const tournamentDataComponents = <TournamentData {...this.state.pageData.tournament} detailed={true}/>;

    const userDataComponents = this.state.pageData.users.map(userDataObject => {
      return (
        <UserData {...userDataObject} detailed={false} />
      );
    })

    const matchDataComponents = this.state.pageData.matches.map(matchDataObject => {
      return (
        <MatchData {...matchDataObject} />
      );
    })

    return (
      <div className="Tournament">
        <div>
          <h2>{this.state.pageData.tournament.tournamentName}</h2>
          <table>
            <thead>
              <tr>
                <th>Tournament Name</th>
                <th>Tournament Start Date</th>
                <th>Acronym</th>
                <th>Links</th>
              </tr>
            </thead>
            <tbody>
              {tournamentDataComponents}
            </tbody>
          </table>
          <h2>Players of the tournament</h2>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Country Rank</th>
                <th>Player Name</th>
                <th>Elo</th>
                <th>Win Rate</th>
                <th>Matches Played</th>
                <th>Tournaments Won</th>
              </tr>
            </thead>
            <tbody>
              {userDataComponents}
            </tbody>
          </table>
          <h2>Matches of the tournament</h2>
          <table>
            <thead>
              <tr>
                <th>Player 1 Elo</th>
                <th>Player 1</th>
                <th>Player 2 Elo</th>
                <th>Player 2</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {matchDataComponents}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Tournament;
