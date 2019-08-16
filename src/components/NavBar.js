import React, { Component } from 'react'
import { Button, Navbar, Form, FormControl, Nav, NavDropdown } from 'react-bootstrap';


export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text"
       placeholder="Search" 
       className="mr-sm-2" 
       value={this.props.userInput}
       onChange={(e)=> this.props.handleOnchange(e)}
       />
      <Button variant="outline-success" onClick={()=>this.props.handleClick()}>Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
            </div>
        )
    }
}
