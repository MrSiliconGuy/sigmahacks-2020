import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BusinessProfileBottom from "./BusinessProfileBottom";
import BusinessProfileTop from "./BusinessProfileTop";
import { useParams } from "react-router-dom";
import { useStore } from "../../store";
import { webfetch } from "../../request";

type BusinessProfileViewProps = {};

export type Business = {
  id: string;
  name: string;
  address: string;
  description: string;
  owner: string;
  location: {
    lat: number;
    lng: number;
  };
  employees: string[];
};
const defaultBusiness: Business = {
  id: "",
  name: "",
  address: "",
  description: "",
  owner: "",
  location: {
    lat: 0,
    lng: 0,
  },
  employees: [],
};

export default function BusinessProfileView(props: BusinessProfileViewProps) {
  const [state, dispatch] = useStore();
  const [profile, setProfile] = useState(defaultBusiness);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const bID = id ?? state.username;
      const res = await webfetch.get("/api/business/" + bID + "/info");
      if (res.status === 400) {
        return;
      }
      const data = res.data as Business;
      setProfile(data);
    })();
  }, []);
  return (
    <Container className="BusinessProfileView">
      <Row>
        <Col md={6}>
          <BusinessProfileTop profile={profile} />
        </Col>
        <Col md={6}>
          <BusinessProfileBottom />
        </Col>
      </Row>
    </Container>
  );
}
