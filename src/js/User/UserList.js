import React, { Component } from 'react';
import axios from 'axios';
import '../../resources/css/UserList.css';
import UserData from './UserData.js';
import NotFound from '../NotFound.js';
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
      if(response.data.length === 0)
        this.setState({pageData: null})
      else
        this.setState({pageData: response.data})
    }).catch((error) => {
      console.log(error)
      this.setState({pageData: null})
    })
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
    const userDataComponents = this.state.pageData.map(userDataObject => {
      return (
        <UserData {...userDataObject} detailed={false} />
      )
    })

    return (
      <div className="User">
        <div>
          <h2>{this.state.country} User Listing</h2>
          <h4>Page {this.state.pageNum}</h4>
          <table>
            <thead>
              <tr>
                <th>UserId</th>
                <th>UserName</th>
                <th>Country</th>
                <th>Rank</th>
                <th>Elo</th>
              </tr>
            </thead>
            <tbody>
              {userDataComponents}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default UserList;
