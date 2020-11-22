import React, { Component } from 'react';
import '../../resources/css/Home2.css';
import TopPlayerTable from './TopPlayerTable.js';
import NewTournaments from './NewTournaments.js';

class Home2 extends Component {
    render() {
        
        return (
            <div className="WholePage">
                <div className="LeftSide main-left">
                    <div className="TopSide">
                        <h1 className="lg-view">Welcome to osuelo.com!</h1>
                        <h1 className="sm-view">osuelo.com <img width="32px" height="32px" src={require('../../resources/images/logos/logo.png')} alt="logo" /></h1>
                        <h6>The 1v1 osu! Elo System Database</h6>
                    </div>
                    <div className="BottomSide">
                        <NewTournaments />
                    </div>
                </div>
                <div className="RightSide main-right">
                    <div className="Top5Players">
                        <TopPlayerTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home2