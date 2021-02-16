import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button type="button" variant="primary" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
}
