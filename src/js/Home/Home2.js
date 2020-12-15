import React, { Component } from 'react';
import '../../resources/css/Home2.css';
import TopPlayerTable from './TopPlayerTable.js';
import NewTournaments from './NewTournaments.js';
import url from '../../resources/config.json';
import axios from 'axios';

class Home2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newTournaments: undefined,
            topPlayers: undefined
        }
    }
    componentDidMount() {
        document.title = "osu! Elo System"
        var endpoint = url.api + 'tournaments/'
        axios.get(endpoint).then((response) => {
          if(response.data.length === 0)
            this.setState({newTournaments: null})
          else
            this.setState({newTournaments: response.data[1]})
        }).catch((error) => {
          console.log(error)
          this.setState({newTournaments: null})
        })
        endpoint = url.api + 'users/'
        axios.get(endpoint).then((response) => {
          if(response.data.length === 0)
            this.setState({topPlayers: null})
          else
            this.setState({topPlayers: response.data[1]})
        }).catch((error) => {
          console.log(error)
          this.setState({topPlayers: null})
        })
    }
    render() {
        if(this.state.topPlayers === undefined || this.state.newTournaments === undefined)
            return (
                <p>Loading...</p>
            )
        return (
            <div className="WholePage">
                <div className="LeftSide main-left">
                    <div className="TopSide">
                        <h1 className="lg-view">Welcome to osuelo.com!</h1>
                        <h1 className="sm-view">osuelo.com <img width="32px" height="32px" src={require('../../resources/images/logos/logo.png')} alt="logo" /></h1>
                        <h6>The 1v1 osu! Elo System Database</h6>
                    </div>
                    <div className="BottomSide">
                        <NewTournaments pageData = {this.state.newTournaments}/>
                    </div>
                </div>
                <div className="RightSide main-right">
                    <div className="Top5Players">
                        <TopPlayerTable pageData = {this.state.topPlayers}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home2