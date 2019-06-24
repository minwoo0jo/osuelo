import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound.js';
import TournamentData from '../Tournament/TournamentData.js';
import UserData from '../User/UserData.js';
import '../../resources/css/App.css';
import '../../resources/css/Home.css';
import url from '../../resources/config.json';

class Search extends Component {
  constructor(props) {
    super(props)
    const values = queryString.parse(this.props.location.search)
    this.state = {
      query: values.q,
      type: values.t,
      pageData: undefined
    }
  }
  componentDidMount() {
    if(this.state.query !== undefined && this.state.query.length > 2) {
      var endpoint = url.api + 'search?q=' + this.state.query
      if(this.state.type !== undefined)
        endpoint += '&t=' + this.state.type
      console.log(endpoint)
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
    else {
      this.setState({pageData: 'Invalid'})
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.location.search !== undefined && newProps.location.search !== this.props.location.search) {
      const values = queryString.parse(newProps.location.search)
      if(values.q !== undefined && values.q.length > 2) {
        var endpoint = url.api + 'search?q=' + values.q
        if(values.t !== undefined)
          endpoint += '&t=' + values.t
        axios.get(endpoint).then((response) => {
          if(response.data.length === 0)
            this.setState({pageData: null, query: values.q, type: values.t})
          else
            this.setState({pageData: response.data, query: values.q, type: values.t})
        }).catch((error) => {
          console.log(error)
          this.setState({pageData: null, query: values.q, type: values.t})
        })
      }
      else
        this.setState({pageData: 'Invalid'})
    }
  }
    
    render() {
      if(this.state.pageData === undefined)
        return(
          <p>Loading</p>
        )
      if(this.state.pageData === null)
        return (
          <NotFound />
        )
      if(this.state.pageData[0] === 0)
        return(
          <p>No Results</p>
        )
      if(this.state.pageData === 'Invalid')
          return (
            <p>Search query must be at least 3 characters</p>
          )
      const tSearchResults = this.state.pageData[1].map(result => {
        if(result.tournamentName !== undefined)
          return (
            <>
            <thead>
              <tr>
                <th>Tournament Name</th>
                <th>Tournament Start Date</th> 
              </tr>
            </thead>
            <tbody>
              <TournamentData {...result} />
            </tbody>
            </>
          )
        return (
          <></>
        )
      })
      const uSearchResults = this.state.pageData[1].map(result => {
        if(result.userName !== undefined)
          return (
            <>
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
              <UserData {...result} detailed={false} countryList={false}/>
            </tbody>
            </>
          )
        return (
          <></>
        )
      })
      return (
          <div className="App">
            <table>
              {uSearchResults}
            </table>
            <table>
              {tSearchResults}
            </table>
          </div>
      );
    }
}

export default Search