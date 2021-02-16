import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function Navigation() {
  const { logout } = useAuth0();

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand>Cita Dashboard</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            Appointments
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/services">
            Add Service
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Item>
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
