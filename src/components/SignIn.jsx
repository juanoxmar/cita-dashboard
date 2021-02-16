import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Login from './Login';

export default function SignIn() {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Login />
      </Row>
    </Container>
  );
}
