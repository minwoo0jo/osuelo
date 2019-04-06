import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            name: '',
            date: '',
            challonge: '',
            submitted: false,
            dateValid: false
        }
    }
    handleChange(e, field) {
        if(field === 'name') {
            this.setState({name: e.target.value})
        }
        else if(field === 'date') {
            var date = e.target.value.split('-')
            if(date.length == 3 &&
                parseInt(date[0]) > 2000 && parseInt(date[0]) < 2100 &&
                parseInt(date[1]) > 0 && parseInt(date[1]) < 13 &&
                parseInt(date[2]) > 0 && parseInt(date[2]) < 32 &&
                date[0].length === 4 && date[1].length === 2 && date[2].length === 2)
                this.setState({dateValid: true})
            else
                this.setState({dateValid: false})
            this.setState({date: e.target.value})
        }
        else if(field === 'challonge') {
            this.setState({challonge: e.target.value})
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        this.setState({submitted: true})
        console.log(this.state)
    }
  render() {
    return (
        <div className="App">
            <div className="Wrapper">
                <div className="Main">
                    <div className="AboutBody">
                        <h1>UNDER CONSTRUCTION</h1>
                        <h1>UNDER CONSTRUCTION</h1>
                        <h1>UNDER CONSTRUCTION</h1><br/>
                        <h1>Missing a tournament? Submit it here!</h1>
                        <br/><br/>
                        <h6>Restrictions</h6>
                        <hr/>
                        <p>Must be strict 1v1 (No lobby style)</p>
                        <p>Must be badged</p>
                        <p>Must have an upper rank limit of 1000 or higher (no rank 5k-10k tournaments)</p>
                        <hr/>
                        <form>
                            <div style={{color: 'red', display: this.state.submitted&&this.state.name === '' ? 'block' : 'none'}}>
                                This field is required!
                            </div>
                            Tournament Name:<br/>
                            <input type="text" name="name" placeholder="name" onChange={(e) => this.handleChange(e, 'name')}/><br/><br/>
                            <div style={{color: 'red', display: this.state.submitted&&this.state.date === '' ? 'block' : 'none'}}>
                                This field is required!
                            </div>
                            <div style={{color: 'red', display: this.state.submitted&&!this.state.dateValid ? 'block' : 'none'}}>
                                Invalid date format (must be yyyy-mm-dd)
                            </div>
                            Start Date:<br/>
                            <input type="text" name="date" placeholder="yyyy-mm-dd" onChange={(e) => this.handleChange(e, 'date')}/><br/><br/>
                            <div style={{color: 'red', display: this.state.submitted&&this.state.challonge === '' ? 'block' : 'none'}}>
                                This field is required!
                            </div>
                            Challonge:<br/>
                            <input type="text" name="challonge" placeholder="challonge link" onChange={(e) => this.handleChange(e, 'challonge')} /><br/><br/>
                            <input type="button" className="btn btn-secondary" value="Submit not done" onClick={this.handleSubmit} /><br/>
                        </form>
                    </div>
                </div>
                <div className="SideBar">
                    <Link role='button' className='btn btn-secondary btn-lg btn-block' to={`/users`}>Global Player Rankings</Link>
                    <br/>
                    <Link role='button' className='btn btn-secondary btn-lg btn-block' to={`/tournaments`}>Full Tournament Listing</Link>
                    <br/>
                    <Link role='button' className='btn btn-secondary btn-lg btn-block' to={`/about`}>About Page</Link>
                </div>
            </div>
        </div>
    );
  }
}

export default About;