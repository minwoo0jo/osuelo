import React, {Component} from 'react'
import {Navbar, Nav, NavItem, Button, Form, FormControl, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class Navigation extends Component {

  render () {
    return (
        <div>
            <Navbar bg="light" expand="sm">
                <Navbar.Brand>
                    <Link to="/">
                        osu! Tournament Elo System
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
                            <NavDropdown.Item href="/users">
                                <NavItem>Global Elo Ranking</NavItem>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/users/country/page/1">
                                <NavItem>Country Ranking</NavItem>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Navbar.Text>
                            <Link to="/about">
                                <NavItem>About</NavItem>
                            </Link>
                        </Navbar.Text>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search not done" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
  }
}

export default Navigation;

