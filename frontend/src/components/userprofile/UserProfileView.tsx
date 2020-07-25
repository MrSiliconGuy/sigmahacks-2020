import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserProfileTop from "./UserProfileTop";
import UserProfileBottom from "./UserProfileBottom";

type UserProfileViewProps = {};

export default function UserProfileView(props: UserProfileViewProps) {
  return (
    <Container className="UserProfileView">
      <Row>
        <Col md={6}>
          <UserProfileTop />
        </Col>
        <Col md={6}>
          <UserProfileBottom />
        </Col>
      </Row>
    </Container>
  );
}
