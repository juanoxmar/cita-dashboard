import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function Navigation({ id }) {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand>Cita Dashboard</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link as={Link} to={`/?id=${id}`}>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/services/?id=${id}`}>
            Add Service
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

Navigation.propTypes = {
  id: PropTypes.string.isRequired,
};
