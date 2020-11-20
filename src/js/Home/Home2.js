import React, { Component } from 'react';
import '../../resources/css/Home2.css';
import TopPlayerTable from './TopPlayerTable.js';
import NewTournaments from './NewTournaments.js';

class Home2 extends Component {
    render() {
        
        return (
            <div className="WholePage">
                <div className="LeftSide">
                    <div className="TopSide">
                        <h1>Welcome to osuelo.com!</h1>
                        <h6>The 1v1 osu! Elo System Database</h6>
                    </div>
                    <div className="BottomSide">
                        <NewTournaments />
                    </div>
                </div>
                <div className="RightSide">
                    <div className="Top5Players">
                        <TopPlayerTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home2