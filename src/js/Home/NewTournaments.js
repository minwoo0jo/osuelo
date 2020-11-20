import React, { Component } from 'react';
import '../../resources/css/Home2.css';
import { Link } from 'react-router-dom';

class NewTournaments extends Component {
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
        return (
            <>
                <h6>Newly Added Tournaments</h6>
                <div className="card">
                    <div className="card-body" style={{textAlign: "left", paddingBottom: "0px"}}>
                        <div className="card-title" style={{float: "left"}}>
                            <h4><Link to={{pathname: `/tournaments/id/124200`}}>osu! Finnish Tournament 4</Link></h4>
                            <p>Added November 13, 2020</p>
                        </div>
                        <h6 className="card-subtitle mb-2 text-muted" style={{float: "right", paddingRight: "20px"}}>- Regional (Finland) <br/> - Open Rank</h6>
                    </div>
                    <div>
                        <div className="LeftSide" style={{paddingTop: "0px"}}>
                            <div className="card-body" style={{textAlign: "left"}}>
                                <img className="card-img" src={require('../../resources/images/banners/osuFinnishTournament4.png')} alt="banner" />
                            </div>
                        </div>
                        <div className="RightSide" style={{paddingTop: "0px"}}>
                            <div className="card-body">
                                <h6 className="card-text">External Links</h6>
                                <a href={"https://osu.ppy.sh/community/forums/topics/1120853"} target="_blank" rel="noreferrer noopener"><img width="50" height="50" src={imgOsu} alt="Challonge" /></a>
                                <br/>
                                <a href={"https://challonge.com/oft4"} target="_blank" rel="noreferrer noopener"><img width="50" height="50" src={imgChallonge} alt="Challonge" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body" style={{textAlign: "left", paddingBottom: "0px"}}>
                        <div className="card-title" style={{float: "left"}}>
                            <h4><Link to={{pathname: `/tournaments/id/124136`}}>osu! French Tournament 2020</Link></h4>
                            <p>Added November 13, 2020</p>
                        </div>
                        <h6 className="card-subtitle mb-2 text-muted" style={{float: "right", paddingRight: "20px"}}>- Regional (France) <br/> - Open Rank</h6>
                    </div>
                    <div>
                        <div className="LeftSide" style={{paddingTop: "0px"}}>
                            <div className="card-body" style={{textAlign: "left"}}>
                                <img className="card-img" src={require('../../resources/images/banners/osuFrenchTournament2020.png')} alt="banner" />
                            </div>
                        </div>
                        <div className="RightSide" style={{paddingTop: "0px"}}>
                            <div className="card-body">
                                <h6 className="card-text">External Links</h6>
                                <a href={"https://osu.ppy.sh/community/forums/topics/1114561"} target="_blank" rel="noreferrer noopener"><img width="50" height="50" src={imgOsu} alt="Challonge" /></a>
                                <br/>
                                <a href={"https://challonge.com/oft2020"} target="_blank" rel="noreferrer noopener"><img width="50" height="50" src={imgChallonge} alt="Challonge" /></a>
                            </div>
                        </div>
                    </div>
                </div>
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