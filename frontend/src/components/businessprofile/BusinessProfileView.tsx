import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BusinessProfileBottom from "./BusinessProfileBottom";
import BusinessProfileTop from "./BusinessProfileTop";

type BusinessProfileViewProps = {};

export default function BusinessProfileView(props: BusinessProfileViewProps) {
  return (
    <Container className="BusinessProfileView">
      <Row>
        <Col md={6}>
          <BusinessProfileTop />
        </Col>
        <Col md={6}>
          <BusinessProfileBottom />
        </Col>
      </Row>
    </Container>
  );
}
