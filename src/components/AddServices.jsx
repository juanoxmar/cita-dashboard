import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import axios from '../axios';

export default function AddServices({ id }) {
  const [service, setService] = useState({
    service: '',
    price: 0,
    description: '',
  });
  const [isLoading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const onChangeHandler = (e) => {
    setService({
      ...service,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('/service', { ...service, businessId: id })
      .then(() => {
        setConfirmed(true);
      })
      .catch((err) => {
        setConfirmed(false);
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Card className="m-3">
        <Form className="m-5" onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Service</Form.Label>
            <Form.Control id="service" type="text" value={service.service} placeholder="Enter Service to be Provided" onChange={onChangeHandler} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control id="price" type="number" value={service.price} placeholder="Enter Price for Service" onChange={onChangeHandler} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control id="description" as="textarea" value={service.description} placeholder="Enter Description for Service" onChange={onChangeHandler} required />
          </Form.Group>
          <Row className="d-flex justify-content-center">
            {confirmed ? (
              <Alert variant="success">
                Sucessfully Added Service!
              </Alert>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    {' Loading...'}
                  </>
                ) : 'Submit'}
              </Button>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

AddServices.propTypes = {
  id: PropTypes.string.isRequired,
};
