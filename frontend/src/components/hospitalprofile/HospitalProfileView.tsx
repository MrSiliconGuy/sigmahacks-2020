import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HospitalProfileBottom from "./HospitalProfileBottom";
import HospitalProfileTop from "./HospitalProfileTop";

type HospitalProfileViewProps = {};

export default function HospitalProfileView(props: HospitalProfileViewProps) {
  return (
    <Container className="HospitalProfileView">
      <Row>
        <Col md={6}>
          <HospitalProfileTop />
        </Col>
        <Col md={6}>
          <HospitalProfileBottom />
        </Col>
      </Row>
    </Container>
  );
}
