import React, { Component } from 'react';
import '../../resources/css/Home2.css';
import { Link } from 'react-router-dom';

class TopPlayerTable extends Component {
    render() {
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
                    <tr>
                        <td className="top-td top-imageholder" rowSpan="2">
                            <img className="top-image" src={'https://a.ppy.sh/5182050_1552467424.jpeg'} alt="Profile"/>
                        </td>
                        <td className="top-td top-name" colSpan="2" style={{borderBottom: "2px solid lightgray"}}>
                            <Link to={{pathname: `/users/country/GB/1`, page: 1, country: "GB"}}>
                                <img src={require('../../resources/images/country/GB.gif')} alt="GB"/>
                            </Link>{' '}
                            <Link to={{pathname: `/users/id/5182050`}}>Bubbleman</Link>
                        </td>
                        <td className="top-td">
                        <img className="rank-icon" src={require('../../resources/images/logos/goldmedal.svg')} alt="Gold" title="Rank" />
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td" title="1654.713646766123">
                            1654.7 Elo
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/winrate.svg')} alt="Thumbsup" title="Win Rate" />&nbsp;86.62%
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/trophy.svg')} alt="Trophy" title="Tournaments Won" />&nbsp;12
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td top-imageholder" rowSpan="2">
                            <img className="top-image" src={'https://a.ppy.sh/4908650_1552467424.jpeg'} alt="Profile"/>
                        </td>
                        <td className="top-td top-name" colSpan="2" style={{borderBottom: "2px solid lightgray"}}>
                            <Link to={{pathname: `/users/country/US/1`, page: 1, country: "US"}}>
                                <img src={require('../../resources/images/country/US.gif')} alt="US"/>
                            </Link>{' '}
                            <Link to={{pathname: `/users/id/4908650`}}>im a fancy lad</Link>
                        </td>
                        <td className="top-td">
                        <img className="rank-icon" src={require('../../resources/images/logos/silvermedal.svg')} alt="Silver" title="Rank" />
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td" title="1589.3166993355658">
                            1589.3 Elo
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/winrate.svg')} alt="Thumbsup" title="Win Rate" />&nbsp;74.75%
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/trophy.svg')} alt="Trophy" title="Tournaments Won" />&nbsp;4
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td top-imageholder" rowSpan="2">
                            <img className="top-image" src={'https://a.ppy.sh/4787150_1552467424.jpeg'} alt="Profile"/>
                        </td>
                        <td className="top-td top-name" colSpan="2" style={{borderBottom: "2px solid lightgray"}}>
                            <Link to={{pathname: `/users/country/US/1`, page: 1, country: "US"}}>
                                <img src={require('../../resources/images/country/US.gif')} alt="US"/>
                            </Link>{' '}
                            <Link to={{pathname: `/users/id/4787150`}}>Vaxei</Link>
                        </td>
                        <td className="top-td">
                        <img className="rank-icon" src={require('../../resources/images/logos/bronzemedal.svg')} alt="Bronze" title="Rank" />
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td" title="1588.254072506157">
                            1588.3 Elo
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/winrate.svg')} alt="Thumbsup" title="Win Rate" />&nbsp;80.82%
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/trophy.svg')} alt="Trophy" title="Tournaments Won" />&nbsp;6
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td top-imageholder" rowSpan="2">
                            <img className="top-image" src={'https://a.ppy.sh/4650315_1552467424.jpeg'} alt="Profile"/>
                        </td>
                        <td className="top-td top-name" colSpan="2" style={{borderBottom: "2px solid lightgray"}}>
                            <Link to={{pathname: `/users/country/US/1`, page: 1, country: "US"}}>
                                <img src={require('../../resources/images/country/US.gif')} alt="US"/>
                            </Link>{' '}
                            <Link to={{pathname: `/users/id/4650315`}}>idke</Link>
                        </td>
                        <td className="top-td">
                            4<sup>th</sup>
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td" title="1534.5694661185078">
                            1534.6 Elo
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/winrate.svg')} alt="Thumbsup" title="Win Rate" />&nbsp;73.33%
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/trophy.svg')} alt="Trophy" title="Tournaments Won" />&nbsp;4
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td top-imageholder" rowSpan="2">
                            <img className="top-image" src={'https://a.ppy.sh/1473890_1552467424.jpeg'} alt="Profile"/>
                        </td>
                        <td className="top-td top-name" colSpan="2" style={{borderBottom: "2px solid lightgray"}}>
                            <Link to={{pathname: `/users/country/GB/1`, page: 1, country: "RO"}}>
                                <img src={require('../../resources/images/country/RO.gif')} alt="RO"/>
                            </Link>{' '}
                            <Link to={{pathname: `/users/id/1473890`}}>Badeu</Link>
                        </td>
                        <td className="top-td">
                            5<sup>th</sup>
                        </td>
                    </tr>
                    <tr>
                        <td className="top-td" title="1513.8708664978474">
                            1513.9 Elo
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/winrate.svg')} alt="Thumbsup" title="Win Rate" />&nbsp;75.73%
                        </td>
                        <td className="top-td">
                            <img className="table-icon" src={require('../../resources/images/logos/trophy.svg')} alt="Trophy" title="Tournaments Won" />&nbsp;2
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
export default TopPlayerTable