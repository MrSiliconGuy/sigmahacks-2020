import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { webfetch } from "../../request";
import { useStore } from "../../store";
import { useHistory } from "react-router-dom";

type LoginResponse = {
  userID: string;
  name: string;
  token: string;
};

type LoginViewProps = {};

export default function LoginView(props: LoginViewProps) {
  const history = useHistory();
  const [state, dispatch] = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await webfetch.post("/api/login", {
      username,
      password,
    });
    if (res.status === 400) {
      if (res.data.message === "incorrect-credentials")
        alert("Incorrect username or password");
      return;
    }
    const data = res.data as LoginResponse;
    dispatch({
      type: "login",
      name: data.name,
      token: data.token,
      username: data.userID,
    });
    history.push("/user")
  };

  return (
    <Container className="SignUpView">
      <Row>
        <Col md={2} lg={3}></Col>
        <Col className="pt-3" md={8} lg={6}>
          <h1>Login</h1>
          <Form className="sign-up-form" onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
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
