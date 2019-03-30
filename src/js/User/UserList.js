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
    var page = null
    if(this.props.page === undefined)
      page = this.props.match.params.page
    else
      page = this.props.page

    var country = 'Global'
    if(this.props.match.params.country !== undefined)
      country = this.props.match.params.country
    
    this.state = {
      pageData: undefined,
      country: country,
      pageNum: page
    }
  }

  componentDidMount () {
    var endpoint = url.api + 'users/'
    if(this.state.country !== 'Global')
      endpoint += 'country/' + this.state.country + '/'
    else
      endpoint += 'page/'
    axios.get(endpoint + this.state.pageNum).then((response) => {
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
        axios.get(url.api + newProps.location.pathname).then((response) => {
          if(response.data[1].length === 0)
            this.setState({pageData: null, pageNum: newProps.location.page, country: newProps.location.country})
          else
            this.setState({pageData: response.data, pageNum: newProps.location.page, country: newProps.location.country})
        }).catch((error) => {
          console.log(error)
          this.setState({pageData: null, pageNum: newProps.location.page, country: newProps.location.country})
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
        axios.get(url.api + newProps.location.pathname).then((response) => {
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
        <UserData {...userDataObject} detailed={false} countryList={this.state.country !== 'Global'} />
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
            />
          </div>
          <table className>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player Name</th>
                <th>Elo</th>
                <th>Win Rate</th>
                <th>Matches Played</th>
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
            />
          </div>
        </div>
      </div>
    )
  }
}

export default UserList;
