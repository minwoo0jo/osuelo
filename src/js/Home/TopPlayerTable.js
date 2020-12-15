import React, { Component } from 'react';
import '../../resources/css/Home2.css';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound.js';

class TopPlayerTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageData: this.props.pageData,
        }
    }
    render() {
        if(this.state.pageData === null)
            return (
                <NotFound/>
            )
        var top5 = [undefined, undefined, undefined, undefined, undefined]
        if(this.state.pageData !== undefined)
            for(var i = 0; i < 5; i++) {
                if(this.state.pageData[i] !== undefined && this.state.pageData[i] !== null) {
                    top5[i] = <>
                    <tr>
                        <td className="top-td top-imageholder" rowSpan="2">
                            <img className="top-image" src={'https://a.ppy.sh/' + this.state.pageData[i].userId + '_1552467424.jpeg'} alt="Profile"/>
                        </td>
                        <td className="top-td top-name" colSpan="2" style={{borderBottom: "2px solid lightgray"}}>
                            <Link to={{pathname: `/users/country/` + this.state.pageData[i].country + `/1`, page: 1, country: this.state.pageData[i].country}}>
                                <img src={require('../../resources/images/country/' + this.state.pageData[i].country + '.gif')} alt={this.state.pageData[i].country}/>
                            </Link>{' '}
                            <Link to={{pathname: `/users/id/` + this.state.pageData[i].userId}}>{this.state.pageData[i].userName}</Link>
                        </td>
                        <td className="top-td">
                        {i === 0 ? <img className="rank-icon" src={require('../../resources/images/logos/goldmedal.svg')} alt="Gold" title="Rank" /> : <></>}
                        {i === 1 ? <img className="rank-icon" src={require('../../resources/images/logos/silvermedal.svg')} alt="Silver" title="Rank" /> : <></>}
                        {i === 2 ? <img className="rank-icon" src={require('../../resources/images/logos/bronzemedal.svg')} alt="Bronze" title="Rank" /> : <></>}
                        {i >= 3 ? <>{i + 1}<sup>th</sup></> : <></>}
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td" title={this.state.pageData[i].elo}>
                            {this.state.pageData[i].elo.toFixed(1)} Elo
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/winrate.svg')} alt="Thumbsup" title="Win Rate" />&nbsp;{this.state.pageData[i].winRate.toFixed(2)}
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/trophy.svg')} alt="Trophy" title="Tournaments Won" />&nbsp;{this.state.pageData[i].numTournamentWins}
                        </td>
                    </tr></>
                }
            }
        else
            top5 = <>
                    <tr>
                        <td className="top-td top-imageholder" rowSpan="2">
                            <img className="top-image" src={'https://a.ppy.sh/1_1552467424.jpeg'} alt="Profile"/>
                        </td>
                        <td className="top-td top-name" colSpan="2" style={{borderBottom: "2px solid lightgray"}}>
                            Loading...
                        </td>
                        <td className="top-td">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td">
                            Loading...
                        </td>
                        <td className="top-td">
                            Loading...
                        </td>
                        <td className="top-td">
                            &nbsp;
                        </td>
                    </tr></>
        return (
            <table className="top-table">
                <thead>
                    <tr>
                        <th className="top-th" scope="col" colSpan="4">
                            <Link role='button' to={`/users`}>Current Top Players</Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {top5}
                </tbody>
            </table>
        );
    }
}
export default TopPlayerTable