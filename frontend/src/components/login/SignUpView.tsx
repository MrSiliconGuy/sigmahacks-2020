import React, { useState, FormEvent } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import MapContainer from "../MapContainer";
import { Z_DEFAULT_COMPRESSION } from "zlib";
import { webfetch } from "../../request";
import { useHistory } from "react-router-dom";
import { useStore } from "../../store";

type SignUpViewProps = {};

export default function SignUpView(props: SignUpViewProps) {
  return (
    <Container className="SignUpView">
      <Row>
        <Col md={2} lg={3}></Col>
        <Col className="pt-3" md={8} lg={6}>
          <h1>Sign Up</h1>
          <SignUpForm />
        </Col>
        <Col md={2} lg={6}></Col>
      </Row>
    </Container>
  );
}

type SignUpFormProps = {};

type SignupParams = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  address: string;
  healthOrgID: string;
  businessInfo: SignUpBusinessParams;
  hospitalInfo: SignUpHospitalParams;
};
type SignUpBusinessParams = {
  id: string;
  name: string;
  address: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
};
type SignUpHospitalParams = {
  id: string;
  name: string;
  address: string;
  testSchedule: string;
  location: {
    lat: number;
    lng: number;
  };
};

const defaultParams: SignupParams = {
  address: "",
  healthOrgID: "",
  firstname: "",
  lastname: "",
  password: "",
  username: "",
  businessInfo: {
    address: "",
    description: "",
    id: "",
    location: {
      lat: 0,
      lng: 0,
    },
    name: "",
  },
  hospitalInfo: {
    address: "",
    id: "",
    location: {
      lat: 0,
      lng: 0,
    },
    name: "",
    testSchedule: "",
  },
};

type LoginResponse = {
  userID: string;
  name: string;
  token: string;
};

function SignUpForm(props: SignUpFormProps) {
  const [state, dispatch] = useStore();
  const history = useHistory();
  const [signInType, setSignInType] = useState(
    "user" as "user" | "business" | "hospital"
  );
  const [params, setParams] = useState(defaultParams);
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await webfetch.post("/api/signup", {
      address: params.address,
      healthOrgID: params.healthOrgID,
      name: params.firstname + " " + params.lastname,
      password: params.password,
      username: params.username,
      businessInfo: signInType === "business" ? params.businessInfo : undefined,
      hospitalInfo: signInType === "hospital" ? params.hospitalInfo : undefined,
    });
    if (res.status === 400) {
      alert("Something is wrong with your form inputs");
      return;
    }
    const data = res.data as LoginResponse;
    dispatch({
      type: "login",
      name: data.name,
      token: data.token,
      username: data.userID,
    });
    history.push("/user");
  };

  return (
    <Form className="sign-up-form" onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>What are you signing up as?</Form.Label>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant={signInType === "user" ? "secondary" : "outline-secondary"}
            onClick={() => setSignInType("user")}
          >
            As an individual
          </Button>
          <Button
            variant={
              signInType === "business" ? "secondary" : "outline-secondary"
            }
            onClick={() => setSignInType("business")}
          >
            As a business
          </Button>
          <Button
            variant={
              signInType === "hospital" ? "secondary" : "outline-secondary"
            }
            onClick={() => setSignInType("hospital")}
          >
            As a hospital
          </Button>
        </ButtonGroup>
      </Form.Group>
      {/* Hospital */}
      {signInType === "hospital" && (
        <HospitalSignUp
          setParams={(s) =>
            setParams({
              ...params,
              hospitalInfo: s,
            })
          }
          params={params.hospitalInfo}
        />
      )}
      {/* Business */}
      {signInType === "business" && (
        <BusinessSignUp
          setParams={(s) =>
            setParams({
              ...params,
              businessInfo: s,
            })
          }
          params={params.businessInfo}
        />
      )}
      <UserSignUp params={params} setParams={setParams} />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

type HospitalSignUpProps = {
  params: SignUpHospitalParams;
  setParams: (state: SignUpHospitalParams) => void;
};

function HospitalSignUp({ params, setParams }: HospitalSignUpProps) {
  return (
    <>
      <Form.Group>
        <Form.Row>
          <Col>
            <Form.Label>Hospital Name</Form.Label>
            <Form.Control
              required
              placeholder="The name of your hospital"
              value={params.name}
              onChange={(e) => setParams({ ...params, name: e.target.value })}
            />
          </Col>
          <Col>
            <Form.Label>Hospital ID</Form.Label>
            <Form.Control
              required
              placeholder="A unique identifier for your hospital"
              value={params.id}
              onChange={(e) => setParams({ ...params, id: e.target.value })}
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>COVID testing availability</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="What times your hospital offers testing"
          value={params.testSchedule}
          onChange={(e) =>
            setParams({ ...params, testSchedule: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Hospital Address</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Where your hospital is"
          value={params.address}
          onChange={(e) => setParams({ ...params, address: e.target.value })}
        />
      </Form.Group>
      <div className="map">
        <MapContainer onSelect={() => {}} markers={[]} selected={""} />
      </div>
    </>
  );
}

type BusinessSignUpProps = {
  params: SignUpBusinessParams;
  setParams: (state: SignUpBusinessParams) => void;
};

function BusinessSignUp({ params, setParams }: BusinessSignUpProps) {
  return (
    <>
      <Form.Group>
        <Form.Row>
          <Col>
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              required
              placeholder="The name of your business"
              value={params.name}
              onChange={(e) => setParams({ ...params, name: e.target.value })}
            />
          </Col>
          <Col>
            <Form.Label>Business ID</Form.Label>
            <Form.Control
              required
              placeholder="A unique identifier for your business"
              value={params.id}
              onChange={(e) => setParams({ ...params, id: e.target.value })}
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>Busniess Description</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="What is your business about?"
          value={params.description}
          onChange={(e) =>
            setParams({ ...params, description: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Where is your business?"
          value={params.address}
          onChange={(e) => setParams({ ...params, address: e.target.value })}
        />
      </Form.Group>
      <div className="map">
        <MapContainer onSelect={() => {}} markers={[]} selected={""} />
      </div>
    </>
  );
}

type UserSignUpProps = {
  params: SignupParams;
  setParams: (state: SignupParams) => void;
};

function UserSignUp({ params, setParams }: UserSignUpProps) {
  return (
    <>
      <Form.Group>
        <Form.Row>
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              placeholder="First name"
              value={params.firstname}
              onChange={(e) =>
                setParams({ ...params, firstname: e.target.value })
              }
            />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              placeholder="Last name"
              value={params.lastname}
              onChange={(e) =>
                setParams({ ...params, lastname: e.target.value })
              }
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>Health Card Number</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter health card number"
          value={params.healthOrgID}
          onChange={(e) =>
            setParams({ ...params, healthOrgID: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter your street address"
          value={params.address}
          onChange={(e) => setParams({ ...params, address: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter username"
          value={params.username}
          onChange={(e) => setParams({ ...params, username: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Enter a strong password"
          value={params.password}
          onChange={(e) => setParams({ ...params, password: e.target.value })}
        />
      </Form.Group>
    </>
  );
}
