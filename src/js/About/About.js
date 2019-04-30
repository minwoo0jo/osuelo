import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
  render() {
    return (
        <div className="App">
            <div className="Wrapper">
                <div className="Main">
                    <div className="AboutBody">
                        <h1>About</h1>
                        <hr/>
                        <div className="AboutTopic">
                            <h3>What is elo?</h3>
                            <hr/>
                            <p>
                                <a href="https://en.wikipedia.org/wiki/Elo_rating_system">Elo</a> is a rating system designed to calculate skill levels of players.
                                It is no secret that the soloplayer focused pp ranking system in osu! is not very effective at calculating skill levels of tournament players,
                                as consistency is a skill that is almost disregarded in solo play. That is where the osu! Tournament elo system hopes to provide a better solution.
                            </p>
                            <br/><br/>
                            <h3>Why are team tournaments not listed?</h3>
                            <hr/>
                            <p>
                                We use only 1v1 tournaments for many reasons, with the biggest reason being that team tournaments with substitute players make it very difficult
                                to gauge skill level for players at an individual level. It is difficult to also gauge how much a player in a team is "carried" in a victory
                                in the Elo rating system, as the system was initially designed for 1v1 matches only.
                            </p>
                            <br/><br/>
                            <h3>How is elo calculated?</h3>
                            <hr/>
                            <p>
                                The formula is shown here:<br/>
                                <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/09a11111b433582eccbb22c740486264549d1129" alt="Elo Rating Calculation"/>
                                <br/> where K is 90 until 10 matches played, then 60 until 30 matches played, then 30 afterwards. E is calculated with this formula: <br/>
                                <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/51346e1c65f857c0025647173ae48ddac904adcb" alt="Expected Elo Rating Calculation"/>
                                <br/> The specifics of the math involved can be found in the <a href="https://en.wikipedia.org/wiki/Elo_rating_system">wikipedia page.</a>
                                The only adjustment I've made to the formula is to reduce the K value to 1/3 when playing against an unplaced opponent (less than 10 matches played).
                                <br/> It should be less punishing to lose against a top player who simply plays very few 1v1 tournaments in favor of team tournaments, and
                                beating new players who might deserve a much lower elo than the starting elo should not overinflate the elo ratings of the people who beat them.
                            </p>
                            <br/><br/>
                            <h3>Why is player x higher than player y?</h3>
                            <hr/>
                            <p>
                                Obviously, the system isn't without its flaws, and a major flaw is that until a decent number of matches are played, a player will most likely
                                have an incorrect rating. Most of the cases of overinflated elo ratings can be found with players who regularly play matches against these players
                                who have not found their true ratings yet.
                            </p>
                            <br/><br/>
                        </div>
                    </div>
                </div>
                <div className="SideBar">
                    <Link role='button' className='btn btn-secondary btn-lg btn-block' to={`/users`}>Global Player Rankings</Link>
                    <br/>
                    <Link role='button' className='btn btn-secondary btn-lg btn-block' to={`/tournaments`}>Full Tournament Listing</Link>
                    <br/>
                    <Link role='button' className='btn btn-secondary btn-lg btn-block' to={`/`}>Home Page</Link>
                </div>
            </div>
        </div>
    );
  }
}

export default About;