import React, {Component} from 'react'
import {Navbar, Nav, NavItem, Button, Form, FormControl, NavDropdown} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'


class Navigation extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSetting = this.handleSetting.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
        this.state = {
            redirect: false,
            path: undefined,
            search: 'Search All',
            value: ''
        }
    }
    handleChange(e) {
        this.setState({value: e.target.value})
    }
    handleSetting(e, search) {
        this.setState({search: search})
    }
    handleSubmit(e) {
        e.preventDefault()
        var type = ''
        if(this.state.search === 'Search Users')
            type = '&t=u'
        else if(this.state.search === 'Search Tournaments')
            type = '&t=t'
        this.props.history.push('/search?q=' + this.state.value + type)
    }
    handleRedirect(e, path) {
        this.props.history.push(path)
    }

  render () {
    return (
        <div>
            <Navbar bg="light" expand="sm">
                <Navbar.Brand>
                    <Link to="/">
                        <img width="50" height="50" src={require('../../resources/images/logos/logo.png')} alt="logo"/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Navbar.Text>
                            <Link to="/tournaments">
                                <NavItem>Tournaments</NavItem>
                            </Link>
                        </Navbar.Text>
                        <NavDropdown title="Rankings" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={(e) => this.handleRedirect(e, '/users')}>
                                    <NavItem>Global Elo Ranking</NavItem>
                                </NavDropdown.Item>
                            <NavDropdown.Item onClick={(e) => this.handleRedirect(e, '/users/country/page/1')}>
                                <NavItem>Country Ranking</NavItem>
                            </NavDropdown.Item>
                        </NavDropdown>
                        &nbsp;
                        <Navbar.Text>
                            <Link to="/about">
                                <NavItem>About</NavItem>
                            </Link>
                        </Navbar.Text>
                        &nbsp;
                        <Navbar.Text>
                            <Link to="/submit">
                                <NavItem>Submit</NavItem>
                            </Link>
                        </Navbar.Text>
                    </Nav>
                    <Form inline onSubmit={this.handleSubmit}>
                        <Nav>
                            <NavDropdown title={this.state.search} id="basic-nav-dropdown" className="mr-auto shrink">
                                <NavDropdown.Item onClick={(e) => this.handleSetting(e, 'Search All')}>
                                    <NavItem>
                                        Search All
                                    </NavItem>
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={(e) => this.handleSetting(e, 'Search Tournaments')}>
                                    <NavItem>
                                        Search Tournaments
                                    </NavItem>
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={(e) => this.handleSetting(e, 'Search Users')}>
                                    <NavItem>
                                        Search Users
                                    </NavItem>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <FormControl type="text" placeholder="Search" onChange={this.handleChange} />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
  }
}

export default withRouter(Navigation);

