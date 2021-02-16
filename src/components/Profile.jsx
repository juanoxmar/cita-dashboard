import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import axios from '../axios';

export default function Profile() {
  const [isLoading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [errMessage, setErrMessage] = useState(null);

  const { user } = useAuth0();

  // temp ID
  const id = 2;

  useEffect(() => {
    axios.get(`/business/${id}`)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  }, []);

  const onChangeHandler = (e) => {
    setProfile({
      ...profile,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrMessage(null);
    setMessage(null);
    setSaving(true);
    axios.post(`/business/${id}`, {
      ...profile,
      businessId: id,
    })
      .then(() => {
        setMessage('Successully Saved!');
        setDisabled(true);
      })
      .catch((err) => {
        setErrMessage(err.message);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const messageReset = () => {
    setErrMessage(null);
    setMessage(null);
  };

  if (isLoading) {
    return (
      <>
        <Row className="mt-5 d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
          {message}
        </Row>
      </>
    );
  }

  return (
    <Container>
      <Row className="mt-3">
        <Col lg={4} className="mb-3">
          <Card>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Image src={user.picture} roundedCircle width="100" />
              <Card.Text className="mt-3">{user.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8}>
          <Form onSubmit={submitHandler}>
            <Row className="d-flex justify-content-end mr-1">
              <Button type="button" onClick={() => setDisabled(!disabled)} variant={disabled ? 'primary' : 'danger'}>
                Edit
              </Button>
            </Row>
            <Form.Group>
              <Form.Label>Business Name</Form.Label>
              <Form.Control id="name" type="text" placeholder="Enter business name" required readOnly={disabled} value={profile.name} onChange={onChangeHandler} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Services Type</Form.Label>
              <Form.Control id="serviceType" type="text" placeholder="Enter the services type" required readOnly={disabled} value={profile.serviceType} onChange={onChangeHandler} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control className="mb-2" id="street" type="text" placeholder="Street" required readOnly={disabled} value={profile.street} onChange={onChangeHandler} />
              <Form.Control className="mb-2" id="city" type="text" placeholder="City" required readOnly={disabled} value={profile.city} onChange={onChangeHandler} />
              <Form.Control className="mb-2" id="state" type="text" placeholder="State" required readOnly={disabled} value={profile.state} onChange={onChangeHandler} />
              <Form.Control id="zip" type="text" placeholder="Zip" required readOnly={disabled} value={profile.zip} onChange={onChangeHandler} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cover Photo</Form.Label>
              <Form.Control id="photo" type="text" placeholder="Enter an image url" required readOnly={disabled} value={profile.photo} onChange={onChangeHandler} />
            </Form.Group>

            <Button variant="primary" type="submit" hidden={disabled}>
              {saving ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {' Saving...'}
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </Form>
          <Alert className="mt-3" style={{ cursor: 'pointer' }} variant={errMessage ? 'danger' : 'success'} hidden={!(message || errMessage)} onClick={messageReset}>
            {message}
            {errMessage}
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
