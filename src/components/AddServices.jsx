import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import axios from '../axios';

export default function AddServices() {
  const [service, setService] = useState({
    service: '',
    price: 0,
    description: '',
  });
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errMessage, setErrMessage] = useState(null);

  // temp ID
  const id = 2;

  const onChangeHandler = (e) => {
    setService({
      ...service,
      [e.target.id]: e.target.value,
    });
  };

  const messageReset = () => {
    setErrMessage(null);
    setMessage(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('/service', { ...service, businessId: id })
      .then(() => {
        setMessage('Successully Added Service!');
        setService({
          service: '',
          price: 0,
          description: '',
        });
      })
      .catch((err) => {
        setErrMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Card className="shadow-sm p-3 m-3 bg-white rounded" border="light">
        <Form className="mx-5 my-3" onSubmit={submitHandler}>
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
          </Row>
        </Form>
      </Card>
      <Alert className="mt-3" style={{ cursor: 'pointer' }} variant={errMessage ? 'danger' : 'success'} hidden={!(message || errMessage)} onClick={messageReset}>
        {message}
        {errMessage}
      </Alert>
    </Container>
  );
}
