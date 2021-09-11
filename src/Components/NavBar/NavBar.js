import React from 'react';
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
const NavBar = () => {
  return(
      <Navbar bg="light" expand="lg">
          <Container>
              <Navbar.Brand href="#home">Y-Change</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link href='/'>Home</Nav.Link>
                      <Nav.Link href="/register">Register</Nav.Link>
                      <Nav.Link href="/login">Login</Nav.Link>
                      <NavDropdown title="Quiz Series" id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">Quiz 1</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">Quiz 2</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">Quiz 3</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">Quiz Report</NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>

  );
};

export default NavBar;