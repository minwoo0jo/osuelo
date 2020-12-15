import React, { Component } from 'react';
import '../../resources/css/Home2.css';
import { Link } from 'react-router-dom';
import url from '../../resources/config.json';
import axios from 'axios';
import NotFound from '../NotFound.js';


class NewTournaments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageData: this.props.pageData,
        }
    }
    render() {
        var imgChallonge = undefined
        try {
            imgChallonge = require('../../resources/images/logos/challonge.ico')
        } catch {
            imgChallonge = ''
        }
        var imgOsu = undefined
        try {
            imgOsu = require('../../resources/images/logos/osu.ico')
        } catch {
            imgOsu = ''
        }
        if(this.state.pageData === null)
            return (
                <NotFound/>
            )
        var recentTournaments = [undefined, undefined]
        if(this.state.pageData !== undefined)
            for(var i = 0; i < 2; i++) {
                var region = "- " + this.state.pageData[i].regionType
                if(this.state.pageData[i].region === "None")
                    region += ""
                else
                    region += " ("+this.state.pageData[i].region+")"
                var rankRestrict = "- "
                if(this.state.pageData[i].rankRestrict === "None" || (this.state.pageData[i].rankRestrict[0] === "1" && this.state.pageData[i].rankRestrict[1] === "-"))
                    rankRestrict += "Open Rank"
                else if(this.state.pageData[i].rankRestrict === "Invitational")
                    rankRestrict += "Invitational"
                else if(this.state.pageData[i].rankRestrict[this.state.pageData[i].rankRestrict.length - 1] === "+")
                    rankRestrict += "Rank " + this.state.pageData[i].rankRestrict
                else
                    rankRestrict += this.state.pageData[i].rankRestrict + " Rank Range"
                recentTournaments[i] =
                <div className="card">
                    <div className="card-body" style={{textAlign: "left", paddingBottom: "0px"}}>
                        <div className="card-title" style={{float: "left"}}>
                            <h4><Link to={{pathname: `/tournaments/id/` + this.state.pageData[i].tournamentId}}>{this.state.pageData[i].tournamentName}</Link></h4>
                            <p>Added {this.state.pageData[i].dateAdded}</p>
                        </div>
                    <h6 className="card-subtitle mb-2 text-muted" style={{float: "right", paddingRight: "20px"}}>{region}<br/>{rankRestrict}</h6>
                    </div>
                    <div>
                        <div className="LeftSide" style={{paddingTop: "0px"}}>
                            <div className="card-body" style={{textAlign: "left"}}>
                                <img className="card-img" src={require('../../resources/images/banners/'+this.state.pageData[i].shortName+'.png')} alt="banner" />
                            </div>
                        </div>
                        <div className="RightSide" style={{paddingTop: "0px"}}>
                            <div className="card-body links">
                                <h6 className="card-text">External Links</h6>
                                <a href={this.state.pageData[i].forum} target="_blank" rel="noreferrer noopener"><img width="50" height="50" src={imgOsu} alt="Forum" /></a>
                                <br/>
                                <a href={this.state.pageData[i].challonge} target="_blank" rel="noreferrer noopener"><img width="50" height="50" src={imgChallonge} alt="Challonge" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            }
        else {
            recentTournaments = 
            <div className="card">
                    <div className="card-body" style={{textAlign: "left", paddingBottom: "0px"}}>
                        <div className="card-title" style={{float: "left"}}>
                            <h4>Loading...</h4>
                        </div>
                    </div>
                    <div>
                        <div className="LeftSide" style={{paddingTop: "0px"}}>
                            <div className="card-body" style={{textAlign: "left"}}>
                            </div>
                        </div>
                        <div className="RightSide" style={{paddingTop: "0px"}}>
                            <div className="card-body links">
                            </div>
                        </div>
                    </div>
                </div>
        }
        return (
            <>
                <h6>Newly Added Tournaments</h6>
                {recentTournaments}
                <div className="card">
                    <div className="card-body">
                        <h5><Link to={{pathname: `/tournaments`}}>See the full tournament list</Link></h5>
                    </div>
                </div>
            </>
        );
    }
}

export default NewTournaments