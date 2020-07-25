import React from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import MapContainer from "../MapContainer";

type SignUpViewProps = {};

export default function SignUpView(props: SignUpViewProps) {
  return (
    <Container className="SignUpView">
      <Row>
        <Col md={2} lg={3}></Col>
        <Col className="pt-3" md={8} lg={6}>
          <h1>Sign Up</h1>
          <Form className="sign-up-form">
            <Form.Group>
              <Form.Label>What are you signing up as?</Form.Label>
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">As an individual</Button>
                <Button variant="secondary">As a business</Button>
                <Button variant="secondary">As a hospital</Button>
              </ButtonGroup>
            </Form.Group>
            {/* Hospital */}
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Label>Hospital Name</Form.Label>
                  <Form.Control placeholder="First name" />
                </Col>
                <Col>
                  <Form.Label>Hospital ID</Form.Label>
                  <Form.Control placeholder="Last name" />
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>COVID testing availability</Form.Label>
              <Form.Control type="text" placeholder="COVID test availability" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Hospital Address" />
            </Form.Group>
            <div className="map">
              <MapContainer onSelect={() => {}} markers={[]} selected={""} />
            </div>
            {/* Business */}
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control placeholder="First name" />
                </Col>
                <Col>
                  <Form.Label>Business ID</Form.Label>
                  <Form.Control placeholder="Last name" />
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>Busniess Description</Form.Label>
              <Form.Control type="text" placeholder="Hospital Name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Hospital Address" />
            </Form.Group>
            <div className="map">
              <MapContainer onSelect={() => {}} markers={[]} selected={""} />
            </div>
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control placeholder="First name" />
                </Col>
                <Col>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control placeholder="Last name" />
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>Health Card Number</Form.Label>
              <Form.Control type="text" placeholder="Enter health card number" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={2} lg={6}></Col>
      </Row>
    </Container>
  );
}
