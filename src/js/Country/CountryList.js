import React, { Component } from 'react';
import axios from 'axios';
import '../../resources/css/UserList.css';
import '../../resources/css/List.css';
import CountryData from './CountryData.js';
import NotFound from '../NotFound.js';
import Pagination from '../Paging/Pagination.js';
import url from '../../resources/config.json';

class CountryList extends Component {
  constructor(props) {
    super(props)
    var page = null
    if(this.props.match.params.page === undefined)
      page = 1
    else
      page = this.props.match.params.page
    
    this.state = {
      pageData: undefined,
      pageNum: page,
      total: 0
    }
  }

  componentDidMount () {
    var endpoint = url.api + 'users/country'
    axios.get(endpoint).then((response) => {
      if(response.data.length === 0 || response.data.length - 1 < (this.state.pageNum - 1) * 50)
        this.setState({pageData: null})
      else
        this.setState({pageData: response.data.slice((this.state.pageNum - 1) * 50), total: response.data.length})
      if(this.state.pageData.length > 50)
        this.setState({pageData: this.state.pageData.slice(0, 50), total: response.data.length})
    }).catch((error) => {
      console.log(error)
      this.setState({pageData: null})
    })
  }

  componentWillReceiveProps(newProps) {
    if(this.state.pageData !== undefined && newProps.location.pathname !== this.props.location.pathname) {
        if(newProps.location.page !== undefined) {
            let endpoint = url.api + 'users/country'
            axios.get(endpoint).then((response) => {
                if(response.data.length === 0 || response.data.length - 1 < (newProps.location.page - 1) * 50)
                    this.setState({pageData: null, pageNum: newProps.location.page})
                else
                    this.setState({pageData: response.data.slice((newProps.location.page - 1) * 50), pageNum: newProps.location.page, total: response.data.length})
                if(this.state.pageData.length > 50)
                    this.setState({pageData: this.state.pageData.slice(0, 50), total: response.data.length})
            }).catch((error) => {
                console.log(error)
                this.setState({pageData: null, pageNum: newProps.location.page})
            })
        }
        else {
            let path = newProps.location.pathname.split("/")
            let page = 1
            if(path[path.length - 2] === 'page')
                page = parseInt(path[path.length - 1])
            let endpoint = url.api + 'users/country'
            axios.get(endpoint).then((response) => {
                if(response.data.length === 0 || response.data.length - 1 < (page - 1) * 50)
                    this.setState({pageData: null, pageNum: page})
                else
                    this.setState({pageData: response.data.slice((page - 1) * 50), pageNum: page, total: response.data.length})
                if(this.state.pageData.length > 50)
                    this.setState({pageData: this.state.pageData.slice(0, 50), total: response.data.length})
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
    const countryDataComponents = this.state.pageData.map(countryDataObject => {
      return (
        <CountryData {...countryDataObject} />
      )
    })

    return (
      <div className="List">
        <div>
          <h2>Country Listing</h2>
          <p>Page {this.state.pageNum}</p>
          <div className="TableHeader">
            <p>Displaying {1 + ((this.state.pageNum - 1) * 50)} to {Math.min(this.state.total, this.state.pageNum * 50)} of {this.state.total} results.</p>
            <Pagination
                type={'country'}
                pageNum={this.state.pageNum}
                count={this.state.pageData.length}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Country</th>
                <th>Number of Users</th>
                <th>Average Elo</th>
              </tr>
            </thead>
            <tbody>
              {countryDataComponents}
            </tbody>
          </table>
          <div className="TableHeader">
            <p>Displaying {1 + ((this.state.pageNum - 1) * 50)} to {Math.min(this.state.total, this.state.pageNum * 50)} of {this.state.total} results.</p>
            <Pagination
                type={'country'}
                pageNum={this.state.pageNum}
                count={this.state.pageData.length}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CountryList;
