import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useAuth0 } from '@auth0/auth0-react';

import Calendar from './components/Calendar';
import AddServices from './components/AddServices';
import Navigation from './components/Navigation';
import SignIn from './components/SignIn';
import Profile from './components/Profile';

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  let routes = (
    <>
      <Route path="/" component={SignIn} />
      <Redirect to="/" />
    </>
  );

  if (isLoading) {
    routes = (
      <>
        <Row className="mt-5 d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      </>
    );
  }

  if (isAuthenticated) {
    routes = (
      <>
        <Route path="/services" exact render={() => <AddServices />} />
        <Route path="/profile" exact render={() => <Profile />} />
        <Route path="/" exact render={() => <Calendar />} />
      </>
    );
  }

  return (
    <Container>
      <Navigation />
      <Switch>
        {routes}
      </Switch>
    </Container>
  );
}
