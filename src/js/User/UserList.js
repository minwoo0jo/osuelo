import React, { Component } from 'react';
import axios from 'axios';
import '../../resources/css/UserList.css';
import '../../resources/css/List.css';
import UserData from './UserData.js';
import NotFound from '../NotFound.js';
import Pagination from '../Paging/Pagination.js';
import url from '../../resources/config.json';

class UserList extends Component {
  constructor(props) {
    super(props)
    this.handleSort = this.handleSort.bind(this)
    var page = null
    if(this.props.page === undefined)
      page = this.props.match.params.page
    else
      page = this.props.page

    var country = 'Global'
    if(this.props.match.params.country !== undefined)
      country = this.props.match.params.country
    var sort = 'rank'
    if(this.props.sort !== undefined)
      sort = this.props.sort
    this.state = {
      pageData: undefined,
      country: country,
      pageNum: page,
      sort: sort
    }
  }

  handleSort(e, field) {
    e.preventDefault()
    var endpoint = url.api + 'users/'
    if(this.state.country !== 'Global')
      endpoint += 'country/' + this.state.country + '/'
    else
      endpoint += 'page/'
    axios.get(endpoint + this.state.pageNum + '?sort=' + field).then((response) => {
      if(response.data[1].length === 0)
        this.setState({pageData: null, sort: field})
      else
        this.setState({pageData: response.data, sort: field})
    }).catch((error) => {
      console.log(error)
      this.setState({pageData: null, sort: field})
    })
  }

  componentDidMount () {
    var endpoint = url.api + 'users/'
    if(this.state.country !== 'Global')
      endpoint += 'country/' + this.state.country + '/'
    else
      endpoint += 'page/'
    axios.get(endpoint + this.state.pageNum + '?sort=' + this.state.sort).then((response) => {
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
    if(this.state.pageData !== undefined &&
      (newProps.location.pathname !== this.props.location.pathname ||
      newProps.location.sort !== this.state.sort)) {
      this.setState({pageData: undefined})
      if(newProps.location.page !== undefined) {
        axios.get(url.api + newProps.location.pathname + '?sort=' + newProps.location.sort).then((response) => {
          if(response.data[1].length === 0)
            this.setState({pageData: null, pageNum: newProps.location.page, country: newProps.location.country, sort: newProps.location.sort})
          else
            this.setState({pageData: response.data, pageNum: newProps.location.page, country: newProps.location.country, sort: newProps.location.sort})
        }).catch((error) => {
          console.log(error)
          this.setState({pageData: null, pageNum: newProps.location.page, country: newProps.location.country, sort: newProps.location.sort})
        })
      }
      else {
        let path = newProps.location.pathname.split('/')
        let page = undefined
        let country = 'Global'
        if(path[path.length - 3] === 'country' || path[path.length - 2] === 'page') {
          page = parseInt(path[path.length - 1])
        }
        else
          page = 1
        if(path[path.length - 2] === 'country')
          country = path[path.length - 1]
        else if(path[path.length - 3] === 'country')
          country = path[path.length - 2]
        axios.get(url.api + newProps.location.pathname + '?sort=' + this.state.sort).then((response) => {
          if(response.data[1].length === 0)
            this.setState({pageData: null, pageNum: page, country: country})
          else
            this.setState({pageData: response.data, pageNum: page, country: country})
        }).catch((error) => {
          this.setState({pageData: null, pageNum: page, country: country})
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
    const userDataComponents = this.state.pageData[1].map(userDataObject => {
      return (
        <UserData {...userDataObject} detailed={false} countryList={this.state.country !== 'Global'} sort={this.state.sort}/>
      )
    })

    return (
      <div className="List">
        <div>
          <h2>{this.state.country} User Elo Ranking</h2>
          <p>Page {this.state.pageNum}</p>
          <div className="TableHeader">
            <p>Displaying {1 + ((this.state.pageNum - 1) * 50)} to {Math.min(this.state.pageData[0], this.state.pageNum * 50)} of {this.state.pageData[0]} results.</p>
            <Pagination
              type={'users'}
              pageNum={this.state.pageNum}
              count={this.state.pageData[0]}
              country={this.state.country}
              sort={this.state.sort}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player Name</th>
                {this.state.sort === 'rank' ? <th>Elo&nbsp;<i className="arrow down"></i></th> : 
                  <th onClick={(e) => this.handleSort(e, 'rank')}>Elo</th>}
                {this.state.sort === 'win' ? <th>Win Rate&nbsp;<i className="arrow down"></i></th> : 
                  <th onClick={(e) => this.handleSort(e, 'win')}>Win Rate</th>}
                {this.state.sort === 'matches' ? <th>Matches Played&nbsp;<i className="arrow down"></i></th> : 
                  <th onClick={(e) => this.handleSort(e, 'matches')}>Matches Played</th>}
                {this.state.sort === 'tournamentWin' ? <th>Tournaments Won&nbsp;<i className="arrow down"></i></th> : 
                  <th onClick={(e) => this.handleSort(e, 'tournamentWin')}>Tournaments Won</th>}
              </tr>
            </thead>
            <tbody>
              {userDataComponents}
            </tbody>
          </table>
          <div className="TableHeader">
            <p>Displaying {1 + ((this.state.pageNum - 1) * 50)} to {Math.min(this.state.pageData[0], this.state.pageNum * 50)} of {this.state.pageData[0]} results.</p>
            <Pagination
              type={'users'}
              pageNum={this.state.pageNum}
              count={this.state.pageData[0]}
              country={this.state.country}
              sort={this.state.sort}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default UserList;
