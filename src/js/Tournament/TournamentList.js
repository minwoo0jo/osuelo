import React, { Component } from 'react';
import axios from 'axios';
import '../../resources/css/TournamentList.css';
import TournamentData from './TournamentData.js';
import NotFound from '../NotFound.js';
import url from '../../resources/config.json';

class TournamentList extends Component {

  constructor(props) {
    super(props)
    var page = null
    if(this.props.page === undefined)
      page = this.props.match.params.page
    else 
      page = this.props.page
    this.state = {
      pageData: undefined,
      pageNum: page
    } 
  }

  componentDidMount () {
    axios.get(url.api + 'tournaments/page/' + this.state.pageNum).then((response) => {
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
    if(this.state.pageData !== undefined && newProps.location.page !== undefined) {
      this.setState({pageData: undefined})
      axios.get(url.api + 'tournaments/page/' + newProps.location.page).then((response) => {
        if(response.data.length === 0)
          this.setState({pageData: null, pageNum: newProps.location.page})
        else
          this.setState({pageData: response.data, pageNum: newProps.location.page})
      }).catch((error) => {
        console.log(error)
        this.setState({pageData: null, pageNum: newProps.location.page})
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
    const tournamentDataComponents = this.state.pageData.map(tournamentDataObject => {
      return (
        <TournamentData {...tournamentDataObject} />
      );
    })

    return (
      <div className="Tournament">
        <div>
          <h2>Tournament Listing</h2>
          <h4>Page {this.state.pageNum}</h4>
          <table>
            <thead>
              <tr>
                <th>Tournament Name</th>
                <th>Tournament Start Date</th>
              </tr>
            </thead>
            <tbody>
              {tournamentDataComponents}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TournamentList;
