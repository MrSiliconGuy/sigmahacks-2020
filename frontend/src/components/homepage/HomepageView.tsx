import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logoImg from "../../../assets/logo.png";

export default function HomepageView() {
  return (
    <Container className="Homepage">
      <div className="animate">
        <img src={logoImg} />
        <h1>COVID-Trust</h1>
      </div>
      <p>Building trust within our local businesses and communities</p>
    </Container>
  );
}
