import React, { Component } from 'react';
import axios from 'axios';
import '../../resources/css/TournamentList.css';
import '../../resources/css/List.css';
import TournamentData from './TournamentData.js';
import NotFound from '../NotFound.js';
import Pagination from '../Paging/Pagination.js';
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
    document.title = "Tournament Listing"
    axios.get(url.api + 'tournaments/page/' + this.state.pageNum).then((response) => {
      if(response.data[1].length === 0)
        this.setState({pageData: null})
      else
        this.setState({pageData: response.data})
    }).catch((error) => {
      console.log(error)
      this.setState({pageData: null})
    })
  }

  componentWillReceiveProps(newProps) {
    if(this.state.pageData !== undefined && newProps.location.pathname !== this.props.location.pathname) {
      this.setState({pageData: undefined})
      if(newProps.location.page !== undefined) {
        axios.get(url.api + 'tournaments/page/' + newProps.location.page).then((response) => {
          if(response.data[1].length === 0)
            this.setState({pageData: null, pageNum: newProps.location.page})
          else
            this.setState({pageData: response.data, pageNum: newProps.location.page})
        }).catch((error) => {
          console.log(error)
          this.setState({pageData: null, pageNum: newProps.location.page})
        })
      }
      else {
        let path = newProps.location.pathname.split('/')
        let page = undefined
        if(path[path.length - 1] === 'tournaments')
          page = 1
        else
          page = parseInt(path[path.length - 1])
        axios.get(url.api + newProps.location.pathname).then((response) => {
          if(response.data[1].length === 0)
            this.setState({pageData: null, pageNum: page})
          else
            this.setState({pageData: response.data, pageNum: page})
        }).catch((error) => {
          console.log(error)
          this.setState({pageData: null, pageNum: page})
        })
      }
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
    const tournamentDataComponents = this.state.pageData[1].map(tournamentDataObject => {
      return (
        <TournamentData {...tournamentDataObject} />
      );
    })

    return (
      <div className="Tournament">
        <div>
          <h2>Tournament Listing</h2>
          <p>Page {this.state.pageNum}</p>
          <div className="TableHeader">
            <p>Displaying {1 + ((this.state.pageNum - 1) * 50)} to {Math.min(this.state.pageData[0], this.state.pageNum * 50)} of {this.state.pageData[0]} results.</p>
            <Pagination
              type={'tournaments'}
              pageNum={this.state.pageNum}
              count={this.state.pageData[0]}
            />
          </div>
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
          <div className="TableHeader">
            <p>Displaying {1 + ((this.state.pageNum - 1) * 50)} to {Math.min(this.state.pageData[0], this.state.pageNum * 50)} of {this.state.pageData[0]} results.</p>
            <Pagination
              type={'tournaments'}
              pageNum={this.state.pageNum}
              count={this.state.pageData[0]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TournamentList;
