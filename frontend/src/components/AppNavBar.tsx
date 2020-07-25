import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logoImg from "../../assets/logo.png";
import { useStore } from "../store";
import { useHistory } from "react-router-dom";

type AppNavBarProps = {};

export default function AppNavBar(props: AppNavBarProps) {
  const history = useHistory();
  const [state, dispatch] = useStore();

  const handleLogout = () => {
    dispatch({
      type: "logout",
    });
    history.push("/");
  };

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="/">
        <img
          src={logoImg}
          width="30"
          height="30"
          className="d-inline-block align-top mr-2"
          alt="COVID-Trust logo"
        />
        COVID-Trust
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/map">Map</Nav.Link>
          <Nav.Link href="/user">Profile</Nav.Link>
          <Nav.Link href="/business">Business</Nav.Link>
          <Nav.Link href="/hospital">Testing</Nav.Link>
        </Nav>
        {state.loggedIn ? (
          <>
            <Navbar.Text className="mr-3">{state.name}</Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline-light"
              className="mr-3"
              onClick={() => history.push("/login")}
            >
              Log in
            </Button>
            <Button
              variant="outline-light"
              onClick={() => history.push("/signup")}
            >
              Sign up
            </Button>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
