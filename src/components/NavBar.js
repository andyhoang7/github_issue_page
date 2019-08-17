import React, { Component } from 'react'
import { Button, Navbar, Form, FormControl, Nav, NavDropdown } from 'react-bootstrap';


export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" expand="lg">
  <Navbar.Brand href="#home">GitHub</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home" style={{color:"white", fontweight: 400}}>Pull requests</Nav.Link>
      <Nav.Link href="#link" style={{color:"white", fontweight: 400}}>Issues</Nav.Link>
      <Nav.Link href="#link" style={{color:"white", fontweight: 400}}>Marketplace</Nav.Link>
      <Nav.Link href="#link" style={{color:"white", fontweight: 400}}>Explore</Nav.Link>
      {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    <Form inline>
      <FormControl type="text"
       placeholder="Search" 
       className="mr-sm-2" 
       value={this.props.userInput}
       onChange={(e)=> this.props.handleOnchange(e)}
       />
      <Button type="submit" variant="outline-success" onClick={(e)=>this.props.handleClick(e)}>Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
            </div>
        )
    }
}
