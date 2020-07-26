import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserProfileTop from "./UserProfileTop";
import UserProfileBottom from "./UserProfileBottom";
import { webfetch } from "../../request";
import { useParams } from "react-router-dom";
import { useStore } from "../../store";

type UserProfileViewProps = {};

export type TestResult = "positive" | "negative";
export type Test = {
  id: string;
  date: string;
  result: TestResult;
  hospitalID: string;
  userID: string;
};
export type User = {
  id: string;
  name: string;
  address: string;
  healthOrgID?: string;
  businessID?: string;
  hospitalID?: string;
  tests: Test[];
};

const defaultUser: User = {
  id: "",
  name: "",
  address: "",
  healthOrgID: "",
  businessID: "",
  hospitalID: "",
  tests: [],
};

export default function UserProfileView(props: UserProfileViewProps) {
  const [state, dispatch] = useStore();
  const [profile, setProfile] = useState(defaultUser);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const userID = id ?? state.username;
      const res = await webfetch.get("/api/user/" + userID + "/info");
      if (res.status === 400) {
        return;
      }
      const data = res.data as User;
      setProfile(data);
    })();
  }, [state]);

  return (
    <Container className="UserProfileView">
      <Row>
        <Col md={6}>
          <UserProfileTop profile={profile} />
        </Col>
        <Col md={6}>
          <UserProfileBottom profile={profile} />
        </Col>
      </Row>
    </Container>
  );
}
