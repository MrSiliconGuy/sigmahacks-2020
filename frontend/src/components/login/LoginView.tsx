import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import MapContainer from "../MapContainer";

type LoginViewProps = {};

export default function LoginView(props: LoginViewProps) {
  return (
    <Container className="SignUpView">
      <Row>
        <Col md={2} lg={3}></Col>
        <Col className="pt-3" md={8} lg={6}>
          <h1>Login</h1>
          <Form className="sign-up-form">
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
