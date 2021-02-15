import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Calendar from './components/Calendar';
import AddServices from './components/AddServices';
import Navigation from './components/Navigation';

const id = new URLSearchParams(window.location.search).get('id');

export default function App() {
  const routes = (
    <Switch>
      <Route path="/services" exact render={() => <AddServices id={id} />} />
      <Route path="/" render={() => <Calendar id={id} />} />
    </Switch>
  );

  return (
    <Container>
      <Navigation id={id} />
      {routes}
    </Container>
  );
}
