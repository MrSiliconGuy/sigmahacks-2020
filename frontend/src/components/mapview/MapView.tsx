import React, { useRef, useState } from "react";
import {
  GoogleApiWrapper,
  GoogleAPI,
  Map,
  Marker,
  InfoWindow,
} from "google-maps-react";
import { Container, Row, Col } from "react-bootstrap";

type MapViewProps = {};

export default function MapView(props: MapViewProps) {
  return (
    <Container fluid className="MapView">
      <Row noGutters className="h-100">
        <Col md={7} className="map-col-1">
          <MapContainer selected={""} onClick={() => {}} locations={[]} />
        </Col>
        <Col md={5}>
          <MapList />
        </Col>
      </Row>
    </Container>
  );
}

type MapListProps = {};

function MapList(props: MapListProps) {
  const hospitals: MapListItemProps[] = [
    {
      name: "My Hospital",
      address: "123 sesame street",
      link: "",
    },
  ];
  const businesses: MapListItemProps[] = [
    {
      name: "I sell flowers",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell clothes",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
    {
      name: "I sell groceries",
      address: "123 sesame street",
      link: "",
    },
  ];
  return (
    <div className="MapList">
      <div className="inner-wrapper">
        <h2>Hospitals</h2>
        {hospitals.map((h) => (
          <MapListItem {...h} />
        ))}
        <h2>Local Businesses</h2>
        {businesses.map((b) => (
          <MapListItem {...b} />
        ))}
      </div>
    </div>
  );
}

type MapListItemProps = {
  name: string;
  address: string;
  link: string;
};

function MapListItem(props: MapListItemProps) {
  return (
    <div className="MapListItem">
      <div className="map-row">
        <span className="name mr-auto">{props.name}</span>
        <a className="mr-2" href={props.link}>
          Locate
        </a>
        <a href={props.link}>Profile</a>
      </div>
      <span>{props.address}</span>
    </div>
  );
}

type MapContainerProps = {
  google: GoogleAPI;
  locations: {
    type: "hospital" | "business";
    id: string;
    name: string;
    lat: number;
    lng: number;
  }[];
  selected: string;
  onClick: (id: string) => void;
};

const MapContainer = GoogleApiWrapper({ apiKey: "" })(
  (props: MapContainerProps) => {
    const [selectedMarker, setSelectedMarker] = useState(
      undefined as google.maps.Marker | undefined
    );
    const handleClick = (id: string, marker?: google.maps.Marker) => {
      setSelectedMarker(marker);
      props.onClick(id);
    };

    return (
      <div className="map-wrapper">
        <Map google={props.google}>
          {props.locations.map((l) => (
            <Marker
              onClick={(p, m) => handleClick(l.id, m)}
              position={{ lat: l.lat, lng: l.lng }}
            ></Marker>
          ))}
          <InfoWindow
            map={{} as google.maps.Map}
            google={props.google}
            marker={selectedMarker!}
            visible={true}
          >
            <div>
              <p>A Hospital</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
);
