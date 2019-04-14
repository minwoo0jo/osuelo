import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../resources/config.json'

class About extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            name: '',
            date: '',
            challonge: '',
            forum: '',
            names: [],
            initNames: undefined,
            unlikely: [],
            unlikelyCheck: undefined,
            initUnlikely: undefined,
            mapping: {},
            offset: 0,
            testing: false,
            submitted: false,
            dateValid: false,
            nameValid: false,
            forceOverride: false,
            success: false,
            error: false
        }
    }
    handleChange(e, field) {
        if(field === 'name') {
            this.setState({name: e.target.value})
        }
        else if(field === 'date') {
            var date = e.target.value.split('-')
            if(date.length === 3 &&
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
        else if(field === 'forum') {
            this.setState({forum: e.target.value})
        }
        else if(field.startsWith('check')) {
            let map = this.state.mapping
            let name = field.substring(6)
            let unlikelyCheck = this.state.unlikelyCheck
            if(e.target.checked) {
                map[name] = name
                let keys = Object.keys(map)
                let valid = true
                if(keys.length === this.state.names.length + this.state.unlikely.length + this.state.offset) {
                    for(let i = 0; i < keys.length; i++) {
                        if(map[keys[i]] === '')
                            valid = false
                    }
                }
                else
                    valid = false
                if(this.state.unlikely.includes(name) && unlikelyCheck[name] !== undefined)
                    unlikelyCheck[name] = true
                this.setState({
                    mapping: map,
                    nameValid: valid,
                    unlikelyCheck: unlikelyCheck,
                    forceOverride: unlikelyCheck[name] === true
                })
            }
            else {
                unlikelyCheck[name] = false
                let override = false
                for(let i = 0; i < this.state.unlikely.length; i++)
                    if(unlikelyCheck[this.state.unlikely[i]] === true) {
                        override = true
                        break
                    }
                this.setState({
                    nameValid: false,
                    unlikelyCheck: unlikelyCheck,
                    forceOverride: override
                })
            }
        }
        else if(field.startsWith('mapping')) {
            let map = this.state.mapping
            let name = field.substring(8)
            map[name] = e.target.value
            this.setState({mapping: map})
            let keys = Object.keys(map)
            let valid = true
            if(keys.length === this.state.names.length + this.state.unlikely.length + this.state.offset) {
                for(let i = 0; i < keys.length; i++) {
                    if(map[keys[i]] === '')
                        valid = false
                    else if(map[keys[i]] === keys[i] && this.state.unlikelyCheck[keys[i]] !== true) {
                        valid = false
                    }
                }
            }
            else
                valid = false
            this.setState({
                nameValid: valid
            })
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        this.setState({submitted: true, success: false})
        if(!this.state.testing && this.state.dateValid && this.state.name !== '' && this.state.challonge !== '' && (this.state.nameValid || this.state.names.length + this.state.unlikely.length === 0)) {
            this.setState({testing: true})
            let json = {
                challongeName: this.state.name,
                link: this.state.challonge,
                startDate: this.state.date,
                nameChanges: this.state.mapping,
                forum: this.state.forum
            }
            let url = api.api + 'tournaments/challonge'
            if(this.state.forceOverride)
                url = url + '?o=true'
            axios.post(url, [JSON.parse(JSON.stringify(json))]).then((response) => {
                if(response.data[1].length > 1) {
                    let invalid = []
                    let unlikely = []
                    let offset = this.state.names.length + this.state.unlikely.length + this.state.offset
                    if(response.data[2].length > 1) {
                        invalid = response.data[2].slice(1)
                    }
                    if(response.data[3].length > 1) {
                        unlikely = response.data[3].slice(1)
                    }
                    let unlikelyCheck = []
                    if(invalid.length > 0 || unlikely.length > 0) {
                        if(this.state.initNames !== undefined)
                            for(let i = 0; i < this.state.initNames.length; i++) {
                                if(invalid.includes(this.state.mapping[this.state.initNames[i]])) {
                                    invalid[invalid.indexOf(this.state.mapping[this.state.initNames[i]])] = this.state.initNames[i]
                                }
                                else if(unlikely.includes(this.state.mapping[this.state.initNames[i]])) {
                                    unlikely.splice(unlikely.indexOf(this.state.mapping[this.state.initNames[i]]), 1)
                                    invalid.push(this.state.initNames[i])
                                }
                            }
                        if(this.state.initUnlikely !== undefined)
                            for(let i = 0; i < this.state.initUnlikely.length; i++) {
                                if(unlikely.includes(this.state.mapping[this.state.initUnlikely[i]])) {
                                    if(this.state.mapping[this.state.initUnlikely[i]] !== this.state.initUnlikely[i])
                                        unlikely[unlikely.indexOf(this.state.mapping[this.state.initUnlikely[i]])] = this.state.initUnlikely[i]
                                    else
                                        unlikely.splice(unlikely.indexOf(this.state.mapping[this.state.initUnlikely[i]]), 1)
                                }
                                else if(invalid.includes(this.state.mapping[this.state.initUnlikely[i]])) {
                                    invalid.splice(invalid.indexOf(this.state.mapping[this.state.initUnlikely[i]]), 1)
                                    unlikely.push(this.state.initUnlikely[i])
                                }
                            }
                    }
                    if(this.state.unlikelyCheck === undefined)
                        for(let i = 0; i < unlikely.length; i++)
                            unlikelyCheck[unlikely[i]] = false
                    else
                        unlikelyCheck = this.state.unlikelyCheck
                    if(offset > 0)
                        offset -= invalid.length + unlikely.length
                    if(this.state.initNames === undefined && this.state.initUnlikely === undefined)
                        this.setState({
                            names: invalid,
                            unlikely: unlikely,
                            unlikelyCheck: unlikelyCheck,
                            initNames: invalid,
                            initUnlikely: unlikely,
                            offset: offset,
                            testing: false
                        })
                    else
                        this.setState({
                            names: invalid,
                            unlikely: unlikely,
                            unlikelyCheck: unlikelyCheck,
                            offset: offset,
                            testing: false
                        })
                }
                else if(response.data[0].length > 1) {
                    this.setState({
                        name: '',
                        date: '',
                        challonge: '',
                        forum: '',
                        names: [],
                        unlikely: [],
                        initNames: undefined,
                        initUnlikely: undefined,
                        unlikelyCheck: undefined,
                        mapping: {},
                        offset: 0,
                        testing: false,
                        submitted: false,
                        dateValid: false,
                        nameValid: false,
                        success: true,
                        forceOverride: false,
                        error: false
                    })
                }
                else {
                    this.setState({
                        name: '',
                        date: '',
                        challonge: '',
                        forum: '',
                        names: [],
                        initNames: undefined,
                        unlikely: [],
                        initUnlikely: undefined,
                        unlikelyCheck: undefined,
                        mapping: {},
                        offset: 0,
                        testing: false,
                        submitted: false,
                        dateValid: false,
                        nameValid: false,
                        success: false,
                        forceOverride: false,
                        error: true
                    })
                }
            }).catch((error) => {
                console.log(error)
                this.setState({
                    name: '',
                    date: '',
                    challonge: '',
                    forum: '',
                    names: [],
                    unlikely: [],
                    unlikelyCheck: [],
                    mapping: {},
                    offset: 0,
                    testing: false,
                    submitted: false,
                    dateValid: false,
                    nameValid: false,
                    success: false,
                    forceOverride: false,
                    error: true
                })
            })
        }
    }
  render() {
    const nameMap = this.state.names.map(name => {
        return (
            <>
            {name}:
            <input value={this.state.mapping[name] === undefined ? "" : this.state.mapping[name]} type="text" name="{name}" placeholder="Current name" onChange={(e) => this.handleChange(e, 'mapping ' + name)}/><br/>
            </>
        )
    })
    const unlikelyMap = this.state.unlikely.map(name => {
        return (
            <>
            {name}:
            <input value={this.state.mapping[name] === undefined ? "" : this.state.mapping[name]} type="text" name={name} placeholder="Current name" onChange={(e) => this.handleChange(e, 'mapping ' + name)} disabled={this.state.unlikelyCheck[name]}/>
            &nbsp;<input type="checkbox" name={name + " correct"} value="This name is correct" onChange={(e) => this.handleChange(e, 'check ' + name)}/><br/>
            </>
        )
    })
    const button = <>
    <input
        type="button"
        className="btn btn-outline-primary"
        value="Submit"
        onClick={this.handleSubmit}
        disabled={!(!this.state.testing && this.state.dateValid && this.state.name !== '' && this.state.challonge !== '' && (this.state.nameValid || this.state.names.length + this.state.unlikely.length === 0))}
    /><br/></>
    const disableButton = <><input type="button" className="btn btn-secondary" value="Submitting... This might take up to a minute" disabled onClick={this.handleSubmit} /><br/></>
    return (
        <div className="App">
            <div className="Wrapper">
                <div className="Main">
                    <div className="AboutBody">
                        <h1>Missing a tournament? Submit it here!</h1>
                        <br/><br/>
                        <h6>Restrictions</h6>
                        <hr/>
                        <p>Must be strict 1v1 (No lobby style)</p>
                        <p>Must be badged</p>
                        <p>Must have an upper rank limit of 1000 or higher (no rank 5k-10k tournaments)</p>
                        <p>Must be completed and the badge must have already been awarded</p>
                        <hr/>
                        <form>
                            <div style={{display: this.state.success ? 'block' : 'none'}}>
                                <h1>Success! Thank you for submitting the tournament.</h1>
                                <h1>It will be added after a manual review.</h1>
                            </div>
                            <div style={{color: 'red', display: this.state.error ? 'block' : 'none'}}>
                                ERROR: Something went wrong. Please try again later.
                            </div>
                            <div style={{color: 'red', display: this.state.submitted&&this.state.name === '' ? 'block' : 'none'}}>
                                This field is required!
                            </div>
                            Tournament Name:<br/>
                            <input value={this.state.name} disabled={this.state.initNames !== undefined || this.state.submitted} type="text" name="name" placeholder="name" onChange={(e) => this.handleChange(e, 'name')}/><br/><br/>
                            <div style={{color: 'red', display: this.state.submitted&&this.state.date === '' ? 'block' : 'none'}}>
                                This field is required!
                            </div>
                            <div style={{color: 'red', display: this.state.submitted&&!this.state.dateValid ? 'block' : 'none'}}>
                                Invalid date format (must be yyyy-mm-dd)
                            </div>
                            Start Date:<br/>
                            <input value={this.state.date} disabled={this.state.initNames !== undefined || this.state.submitted} type="text" name="date" placeholder="yyyy-mm-dd" onChange={(e) => this.handleChange(e, 'date')}/><br/><br/>
                            <div style={{color: 'red', display: this.state.submitted&&this.state.challonge === '' ? 'block' : 'none'}}>
                                This field is required!
                            </div>
                            Challonge:<br/>
                            <input value={this.state.challonge} disabled={this.state.initNames !== undefined || this.state.submitted} type="text" name="challonge" placeholder="challonge link" onChange={(e) => this.handleChange(e, 'challonge')} /><br/><br/>
                            Forum Post (optional):<br/>
                            <input value={this.state.forum} disabled={this.state.initNames !== undefined || this.state.submitted} type="text" name="forum" placeholder="forum post link" onChange={(e) => this.handleChange(e, 'forum')} /><br/><br/>
                            <div style={{color: 'red', display: this.state.names.length > 0 ? 'block' : 'none'}}>
                                Invalid Names Found: Please fill in the current names for these players.
                                <br/> If the player is currently restricted, fill in @R followed by the userId (ex: @R12345)
                            </div>
                            {nameMap}<br/>
                            <div style={{color: 'red', display: this.state.unlikely.length ? 'block' : 'none'}}>
                                These names are highly unlikely to be the current names. Please fill in the current names for these players. If you are sure that the names below are accurate, simply check the box next to it.
                                <br/> If the player is currently restricted, fill in @R followed by the userId (ex: @R12345)
                            </div>
                            {unlikelyMap}<br/>
                            {this.state.testing? disableButton : button}
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