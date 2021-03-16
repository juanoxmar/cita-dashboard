import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function ServiceCard({ services, deleteHandler }) {
  const mapServices = services.map(({
    service,
    price,
    description,
    _id,
  }) => (
    <ListGroup.Item key={service} className="d-flex justify-content-between">
      <span className="align-self-center">{`$${price} - ${service}`}</span>
      <span className="align-self-center">{description}</span>
      <Button type="button" variant="danger" onClick={() => deleteHandler(_id)}>Delete</Button>
    </ListGroup.Item>
  ));

  return (
    <Container>
      <h2>Services</h2>
      <ListGroup>
        {mapServices}
      </ListGroup>
    </Container>
  );
}

ServiceCard.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({
    service: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
  deleteHandler: PropTypes.func.isRequired,
};
