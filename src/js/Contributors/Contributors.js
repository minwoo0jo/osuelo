import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Contributors extends Component {
  render() {
    var discordImg = ''
    try {
        discordImg = require('../../resources/images/logos/Discord.png')
    } catch {
        discordImg = ''
    }
    return (
        <div className="App">
            <div className="Wrapper">
                <div className="Main">
                    <div className="AboutBody">
                        <h1>Special thanks to these people that helped with the creation of the site</h1>
                        <hr/>
                        <div className="AboutTopic">
                            <h5>Early Testers</h5><hr/>
                            <p><a href="https://osu.ppy.sh/users/1797189" target="_blank" rel="noreferrer noopener">this1neguy</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/4194445" target="_blank" rel="noreferrer noopener">Apraxia</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/7068973" target="_blank" rel="noreferrer noopener">Yazzehh</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/4384207" target="_blank" rel="noreferrer noopener">DigitalHypno</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/9119507" target="_blank" rel="noreferrer noopener">Dada</a></p><br/>
                            <h5>Data Accumulation</h5><hr/>
                            <p><a href="https://osu.ppy.sh/users/1797189" target="_blank" rel="noreferrer noopener">this1neguy</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/4194445" target="_blank" rel="noreferrer noopener">Apraxia</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/7068973" target="_blank" rel="noreferrer noopener">Yazzehh</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/4384207" target="_blank" rel="noreferrer noopener">DigitalHypno</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/9119507" target="_blank" rel="noreferrer noopener">Dada</a><br/>
                            <a href="https://osu.ppy.sh/users/2042565" target="_blank" rel="noreferrer noopener">jms8719</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/2042565" target="_blank" rel="noreferrer noopener">Toy</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/1076236" target="_blank" rel="noreferrer noopener">ToGlette</a>&nbsp;&nbsp;
                            <a href="https://osu.ppy.sh/users/1206417" target="_blank" rel="noreferrer noopener">Gomo Pslvarh</a></p><br/>
                            <h5>Technical Help</h5><hr/>
                            <p><a href="https://osu.ppy.sh/users/718454" target="_blank" rel="noreferrer noopener">ThePooN</a></p><br/>
                        </div>
                    </div>
                    <div className="AboutBody">
                        <h4>Would you like to contribute? Join the discord server to request new features, report bugs, and discuss the website!</h4>
                        <br/>
                        <a href="https://discord.gg/QAgQAQ3" target="_blank" rel="noreferrer noopener">
                            <img src={discordImg} alt="Discord Server" width="300"/>
                        </a>
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

export default Contributors;