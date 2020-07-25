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

type AppNavBarProps = {};

export default function AppNavBar(props: AppNavBarProps) {
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
        <Navbar.Text className="mr-3">Bryan Chen</Navbar.Text>
        <Button variant="outline-light">Log out</Button>
        {/* <Button variant="outline-light" className="mr-3">
          Log in
        </Button>
        <Button variant="outline-light">Sign up</Button> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
